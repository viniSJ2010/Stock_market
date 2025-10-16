import { renderHook, waitFor } from '@testing-library/react';
import UseTrandingViewWidget from '@/hookes/useTrandingViewWidget';

// Mock document.createElement
const mockScriptElement = {
  src: '',
  async: false,
  innerHTML: '',
};

describe('UseTrandingViewWidget', () => {
  let mockContainer: HTMLDivElement;

  beforeEach(() => {
    // Create a fresh container for each test
    mockContainer = document.createElement('div');
    document.body.appendChild(mockContainer);
    
    // Reset mock script element
    mockScriptElement.src = '';
    mockScriptElement.async = false;
    mockScriptElement.innerHTML = '';
    
    // Mock createElement to track script creation
    jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
      if (tagName === 'script') {
        return mockScriptElement as any;
      }
      return document.createElement(tagName);
    });
  });

  afterEach(() => {
    document.body.removeChild(mockContainer);
    jest.restoreAllMocks();
  });

  it('should return a ref object', () => {
    const { result } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', {}, 600)
    );

    expect(result.current).toHaveProperty('current');
  });

  it('should initialize with null ref', () => {
    const { result } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', {}, 600)
    );

    expect(result.current.current).toBeNull();
  });

  it('should handle script injection when container ref is set', async () => {
    const scriptUrl = 'https://example.com/widget.js';
    const config = { theme: 'dark', locale: 'en' };
    
    const { result } = renderHook(() =>
      UseTrandingViewWidget(scriptUrl, config, 600)
    );

    // Set the ref to our mock container
    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockScriptElement.src).toBe(scriptUrl);
      expect(mockScriptElement.async).toBe(true);
      expect(mockScriptElement.innerHTML).toBe(JSON.stringify(config));
    });
  });

  it('should mark container as loaded after script injection', async () => {
    const { result } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', {}, 600)
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockContainer.dataset.loaded).toBe('true');
    });
  });

  it('should not inject script if already loaded', async () => {
    mockContainer.dataset.loaded = 'true';
    const createElementSpy = jest.spyOn(document, 'createElement');

    const { result } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', {}, 600)
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      // Should not create a new script element if already loaded
      const scriptCalls = createElementSpy.mock.calls.filter(
        call => call[0] === 'script'
      );
      expect(scriptCalls.length).toBe(0);
    });
  });

  it('should handle different height values', async () => {
    const heights = [400, 600, 800];

    for (const height of heights) {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const { result } = renderHook(() =>
        UseTrandingViewWidget('https://example.com/script.js', {}, height)
      );

      result.current.current = container;

      await waitFor(() => {
        expect(container.innerHTML).toContain(`height: ${height}px`);
      });

      document.body.removeChild(container);
    }
  });

  it('should handle different script URLs', async () => {
    const urls = [
      'https://s3.tradingview.com/embed-widget-market-overview.js',
      'https://s3.tradingview.com/embed-widget-stock-heatmap.js',
      'https://s3.tradingview.com/embed-widget-timeline.js',
    ];

    for (const url of urls) {
      const container = document.createElement('div');
      document.body.appendChild(container);

      const { result } = renderHook(() =>
        UseTrandingViewWidget(url, {}, 600)
      );

      result.current.current = container;

      await waitFor(() => {
        expect(mockScriptElement.src).toBe(url);
      });

      document.body.removeChild(container);
    }
  });

  it('should serialize config object correctly', async () => {
    const config = {
      theme: 'dark',
      locale: 'en',
      symbols: ['AAPL', 'MSFT'],
      nested: {
        value: 123,
        flag: true,
      },
    };

    const { result } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', config, 600)
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockScriptElement.innerHTML).toBe(JSON.stringify(config));
    });
  });

  it('should clean up on unmount', async () => {
    const { result, unmount } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', {}, 600)
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockContainer.dataset.loaded).toBe('true');
    });

    unmount();

    // Check that cleanup happened
    expect(mockContainer.innerHTML).toBe('');
    expect(mockContainer.dataset.loaded).toBeUndefined();
  });

  it('should handle config changes', async () => {
    const initialConfig = { theme: 'light' };
    const newConfig = { theme: 'dark' };

    const { result, rerender } = renderHook(
      ({ config }) => UseTrandingViewWidget('https://example.com/script.js', config, 600),
      { initialProps: { config: initialConfig } }
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockScriptElement.innerHTML).toBe(JSON.stringify(initialConfig));
    });

    // Change config
    rerender({ config: newConfig });

    await waitFor(() => {
      // Container should be cleaned and reloaded
      expect(mockContainer.innerHTML).toBe('');
    });
  });

  it('should handle URL changes', async () => {
    const url1 = 'https://example.com/widget1.js';
    const url2 = 'https://example.com/widget2.js';

    const { result, rerender } = renderHook(
      ({ url }) => UseTrandingViewWidget(url, {}, 600),
      { initialProps: { url: url1 } }
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockScriptElement.src).toBe(url1);
    });

    rerender({ url: url2 });

    await waitFor(() => {
      expect(mockContainer.innerHTML).toBe('');
    });
  });

  it('should handle height changes', async () => {
    const { result, rerender } = renderHook(
      ({ height }) => UseTrandingViewWidget('https://example.com/script.js', {}, height),
      { initialProps: { height: 600 } }
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockContainer.innerHTML).toContain('height: 600px');
    });

    rerender({ height: 800 });

    await waitFor(() => {
      expect(mockContainer.innerHTML).toBe('');
    });
  });

  it('should handle empty config object', async () => {
    const { result } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', {}, 600)
    );

    result.current.current = mockContainer;

    await waitFor(() => {
      expect(mockScriptElement.innerHTML).toBe('{}');
    });
  });

  it('should not execute if container is null', () => {
    const { result } = renderHook(() =>
      UseTrandingViewWidget('https://example.com/script.js', {}, 600)
    );

    // Don't set the ref
    expect(result.current.current).toBeNull();
    expect(mockContainer.dataset.loaded).toBeUndefined();
  });
});