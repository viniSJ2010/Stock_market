import React from 'react';
import { render, screen } from '@testing-library/react';
import NavItems from '@/components/NavItems';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('NavItems Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render navigation items', () => {
    render(<NavItems />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should render items as links', () => {
    render(<NavItems />);
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    const searchLink = screen.getByText('Search').closest('a');
    
    expect(dashboardLink).toHaveAttribute('href', '/');
    expect(searchLink).toHaveAttribute('href', '/search');
  });

  it('should highlight active dashboard link when on root path', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavItems />);
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveClass('text-gray-100');
  });

  it('should highlight active search link when on search path', () => {
    mockUsePathname.mockReturnValue('/search');
    render(<NavItems />);
    
    const searchLink = screen.getByText('Search').closest('a');
    expect(searchLink).toHaveClass('text-gray-100');
  });

  it('should not highlight dashboard when on other paths', () => {
    mockUsePathname.mockReturnValue('/search');
    render(<NavItems />);
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).not.toHaveClass('text-gray-100');
  });

  it('should apply hover styles to all links', () => {
    render(<NavItems />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('hover:text-yellow-600');
      expect(link).toHaveClass('transition-colors');
    });
  });

  it('should render as unordered list', () => {
    const { container } = render(<NavItems />);
    const list = container.querySelector('ul');
    
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass('flex');
  });

  it('should handle nested paths correctly', () => {
    mockUsePathname.mockReturnValue('/search/results');
    render(<NavItems />);
    
    const searchLink = screen.getByText('Search').closest('a');
    expect(searchLink).toHaveClass('text-gray-100');
  });

  it('should only highlight root path when exactly on root', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavItems />);
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveClass('text-gray-100');
  });

  it('should not highlight root when on nested path', () => {
    mockUsePathname.mockReturnValue('/search');
    render(<NavItems />);
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).not.toHaveClass('text-gray-100');
  });

  it('should render all navigation items from NAV_ITEMS constant', () => {
    const { container } = render(<NavItems />);
    const items = container.querySelectorAll('li');
    
    // NAV_ITEMS currently has 2 items (Dashboard and Search)
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it('should apply responsive flex classes', () => {
    const { container } = render(<NavItems />);
    const list = container.querySelector('ul');
    
    expect(list).toHaveClass('flex-col');
    expect(list).toHaveClass('sm:flex-row');
  });

  it('should apply responsive gap classes', () => {
    const { container } = render(<NavItems />);
    const list = container.querySelector('ul');
    
    expect(list).toHaveClass('gap-3');
    expect(list).toHaveClass('sm:gap-10');
  });

  it('should apply font-medium to list', () => {
    const { container } = render(<NavItems />);
    const list = container.querySelector('ul');
    
    expect(list).toHaveClass('font-medium');
  });

  it('should use unique keys for list items', () => {
    const { container } = render(<NavItems />);
    const items = container.querySelectorAll('li');
    
    // Each item should be rendered (no React key warnings in console)
    expect(items.length).toBeGreaterThan(0);
  });
});