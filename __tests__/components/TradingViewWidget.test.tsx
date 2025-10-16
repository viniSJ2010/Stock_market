import React from 'react';
import { render, screen } from '@testing-library/react';
import TradingViewWidget from '@/components/TradingViewWidget';

// Mock the hook
jest.mock('@/hookes/useTrandingViewWidget', () => ({
  __esModule: true,
  default: jest.fn(() => ({ current: null })),
}));

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

describe('TradingViewWidget Component', () => {
  const defaultProps = {
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
    config: { theme: 'dark', locale: 'en' },
  };

  it('should render without crashing', () => {
    render(<TradingViewWidget {...defaultProps} />);
    expect(screen.getByText((content, element) => 
      element?.className?.includes('tradingview-widget-container') ?? false
    )).toBeInTheDocument();
  });

  it('should render with title when provided', () => {
    render(<TradingViewWidget {...defaultProps} title="Market Overview" />);
    expect(screen.getByText('Market Overview')).toBeInTheDocument();
  });

  it('should not render title when not provided', () => {
    render(<TradingViewWidget {...defaultProps} />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <TradingViewWidget {...defaultProps} className="custom-chart" />
    );
    const widgetContainer = container.querySelector('.tradingview-widget-container');
    expect(widgetContainer).toHaveClass('tradingview-widget-container');
    expect(widgetContainer).toHaveClass('custom-chart');
  });

  it('should use default height of 600 when not provided', () => {
    const { container } = render(<TradingViewWidget {...defaultProps} />);
    const widgetElement = container.querySelector('.tradingview-widget-container__widget');
    expect(widgetElement).toHaveStyle({ height: 600, width: '100%' });
  });

  it('should accept custom height', () => {
    const { container } = render(<TradingViewWidget {...defaultProps} height={800} />);
    const widgetElement = container.querySelector('.tradingview-widget-container__widget');
    expect(widgetElement).toHaveStyle({ height: 800 });
  });

  it('should render title with correct styling', () => {
    render(<TradingViewWidget {...defaultProps} title="Test Title" />);
    const title = screen.getByText('Test Title');
    expect(title).toHaveClass('font-semibold', 'text-2xl', 'text-gray-100', 'mb-5');
  });

  it('should wrap everything in full width container', () => {
    const { container } = render(<TradingViewWidget {...defaultProps} />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-full');
  });

  it('should always set width to 100%', () => {
    const { container } = render(<TradingViewWidget {...defaultProps} />);
    const widgetElement = container.querySelector('.tradingview-widget-container__widget');
    expect(widgetElement).toHaveStyle({ width: '100%' });
  });

  it('should pass all props to hook correctly', () => {
    const useTrandingViewWidget = require('@/hookes/useTrandingViewWidget').default;
    const mockConfig = { theme: 'light', symbols: ['AAPL'] };
    const mockUrl = 'https://test.com/widget.js';
    
    render(
      <TradingViewWidget 
        scriptUrl={mockUrl}
        config={mockConfig}
        height={500}
      />
    );

    expect(useTrandingViewWidget).toHaveBeenCalledWith(mockUrl, mockConfig, 500);
  });

  it('should be memoized to prevent unnecessary re-renders', () => {
    const { rerender } = render(<TradingViewWidget {...defaultProps} />);
    const useTrandingViewWidget = require('@/hookes/useTrandingViewWidget').default;
    const callCount = useTrandingViewWidget.mock.calls.length;

    // Rerender with same props
    rerender(<TradingViewWidget {...defaultProps} />);
    
    // Should not call hook again with same props due to memo
    expect(useTrandingViewWidget.mock.calls.length).toBe(callCount);
  });

  it('should handle different widget types', () => {
    const widgetTypes = [
      { url: 'embed-widget-market-overview.js', title: 'Market Overview' },
      { url: 'embed-widget-stock-heatmap.js', title: 'Stock Heatmap' },
      { url: 'embed-widget-timeline.js', title: 'Timeline' },
    ];

    widgetTypes.forEach(({ url, title }) => {
      const { unmount } = render(
        <TradingViewWidget
          scriptUrl={`https://s3.tradingview.com/external-embedding/${url}`}
          config={{}}
          title={title}
        />
      );
      
      expect(screen.getByText(title)).toBeInTheDocument();
      unmount();
    });
  });

  it('should handle complex config objects', () => {
    const complexConfig = {
      colorTheme: 'dark',
      dateRange: '12M',
      tabs: [
        { title: 'Tech', symbols: [{ s: 'AAPL', d: 'Apple' }] },
      ],
      showSymbolLogo: true,
    };

    render(
      <TradingViewWidget
        scriptUrl="https://test.com/widget.js"
        config={complexConfig}
      />
    );

    const useTrandingViewWidget = require('@/hookes/useTrandingViewWidget').default;
    expect(useTrandingViewWidget).toHaveBeenCalledWith(
      'https://test.com/widget.js',
      complexConfig,
      600
    );
  });

  it('should render widget container with proper nesting', () => {
    const { container } = render(<TradingViewWidget {...defaultProps} />);
    
    const outerContainer = container.querySelector('.tradingview-widget-container');
    const innerWidget = container.querySelector('.tradingview-widget-container__widget');
    
    expect(outerContainer).toBeInTheDocument();
    expect(innerWidget).toBeInTheDocument();
    expect(outerContainer).toContainElement(innerWidget);
  });

  it('should handle empty config object', () => {
    render(<TradingViewWidget scriptUrl="https://test.com/widget.js" config={{}} />);
    
    const useTrandingViewWidget = require('@/hookes/useTrandingViewWidget').default;
    expect(useTrandingViewWidget).toHaveBeenCalledWith(
      'https://test.com/widget.js',
      {},
      600
    );
  });
});