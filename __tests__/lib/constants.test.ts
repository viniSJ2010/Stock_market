import {
  NAV_ITEMS,
  INVESTMENT_GOALS,
  RISK_TOLERANCE_OPTIONS,
  PREFERRED_INDUSTRIES,
  ALERT_TYPE_OPTIONS,
  CONDITION_OPTIONS,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  HEATMAP_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  POPULAR_STOCK_SYMBOLS,
  NO_MARKET_NEWS,
  WATCHLIST_TABLE_HEADER,
} from '@/lib/constants';

describe('Navigation Constants', () => {
  describe('NAV_ITEMS', () => {
    it('should be an array with proper structure', () => {
      expect(Array.isArray(NAV_ITEMS)).toBe(true);
      expect(NAV_ITEMS.length).toBeGreaterThan(0);
    });

    it('should have valid href and label properties', () => {
      NAV_ITEMS.forEach(item => {
        expect(item).toHaveProperty('href');
        expect(item).toHaveProperty('label');
        expect(typeof item.href).toBe('string');
        expect(typeof item.label).toBe('string');
        expect(item.href).toMatch(/^\//); // href should start with /
      });
    });

    it('should include Dashboard and Search items', () => {
      const labels = NAV_ITEMS.map(item => item.label);
      expect(labels).toContain('Dashboard');
      expect(labels).toContain('Search');
    });

    it('should have unique hrefs', () => {
      const hrefs = NAV_ITEMS.map(item => item.href);
      const uniqueHrefs = new Set(hrefs);
      expect(uniqueHrefs.size).toBe(hrefs.length);
    });
  });
});

describe('Form Option Constants', () => {
  describe('INVESTMENT_GOALS', () => {
    it('should have valid value and label structure', () => {
      expect(Array.isArray(INVESTMENT_GOALS)).toBe(true);
      INVESTMENT_GOALS.forEach(goal => {
        expect(goal).toHaveProperty('value');
        expect(goal).toHaveProperty('label');
        expect(typeof goal.value).toBe('string');
        expect(typeof goal.label).toBe('string');
      });
    });

    it('should contain expected investment goal types', () => {
      const values = INVESTMENT_GOALS.map(g => g.value);
      expect(values).toContain('Growth');
      expect(values).toContain('Income');
      expect(values).toContain('Balanced');
      expect(values).toContain('Conservative');
    });

    it('should have matching value and label', () => {
      INVESTMENT_GOALS.forEach(goal => {
        expect(goal.value).toBe(goal.label);
      });
    });
  });

  describe('RISK_TOLERANCE_OPTIONS', () => {
    it('should have valid structure', () => {
      expect(Array.isArray(RISK_TOLERANCE_OPTIONS)).toBe(true);
      RISK_TOLERANCE_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
      });
    });

    it('should contain Low, Medium, and High options', () => {
      const values = RISK_TOLERANCE_OPTIONS.map(o => o.value);
      expect(values).toContain('Low');
      expect(values).toContain('Medium');
      expect(values).toContain('High');
    });
  });

  describe('PREFERRED_INDUSTRIES', () => {
    it('should have valid structure', () => {
      expect(Array.isArray(PREFERRED_INDUSTRIES)).toBe(true);
      expect(PREFERRED_INDUSTRIES.length).toBeGreaterThan(0);
    });

    it('should contain common industry categories', () => {
      const values = PREFERRED_INDUSTRIES.map(i => i.value);
      expect(values).toContain('Technology');
      expect(values).toContain('Healthcare');
      expect(values).toContain('Finance');
    });
  });

  describe('ALERT_TYPE_OPTIONS', () => {
    it('should contain upper and lower alert types', () => {
      const values = ALERT_TYPE_OPTIONS.map(a => a.value);
      expect(values).toContain('upper');
      expect(values).toContain('lower');
      expect(ALERT_TYPE_OPTIONS).toHaveLength(2);
    });
  });

  describe('CONDITION_OPTIONS', () => {
    it('should contain comparison conditions', () => {
      const values = CONDITION_OPTIONS.map(c => c.value);
      expect(values).toContain('greater');
      expect(values).toContain('less');
    });

    it('should have descriptive labels with operators', () => {
      CONDITION_OPTIONS.forEach(option => {
        expect(option.label).toMatch(/[><]/);
      });
    });
  });
});

describe('TradingView Widget Configurations', () => {
  describe('MARKET_OVERVIEW_WIDGET_CONFIG', () => {
    it('should have required configuration properties', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('colorTheme');
      expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('locale');
      expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('width');
      expect(MARKET_OVERVIEW_WIDGET_CONFIG).toHaveProperty('height');
    });

    it('should use dark theme', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.colorTheme).toBe('dark');
    });

    it('should have tabs array with valid structure', () => {
      expect(Array.isArray(MARKET_OVERVIEW_WIDGET_CONFIG.tabs)).toBe(true);
      MARKET_OVERVIEW_WIDGET_CONFIG.tabs.forEach(tab => {
        expect(tab).toHaveProperty('title');
        expect(tab).toHaveProperty('symbols');
        expect(Array.isArray(tab.symbols)).toBe(true);
      });
    });

    it('should have symbols with proper structure', () => {
      MARKET_OVERVIEW_WIDGET_CONFIG.tabs.forEach(tab => {
        tab.symbols.forEach(symbol => {
          expect(symbol).toHaveProperty('s');
          expect(symbol).toHaveProperty('d');
          expect(typeof symbol.s).toBe('string');
          expect(typeof symbol.d).toBe('string');
        });
      });
    });

    it('should have valid color codes', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.plotLineColorGrowing).toMatch(/^#[0-9A-F]{6}$/i);
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.backgroundColor).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should contain Financial, Technology, and Services tabs', () => {
      const titles = MARKET_OVERVIEW_WIDGET_CONFIG.tabs.map(t => t.title);
      expect(titles).toContain('Financial');
      expect(titles).toContain('Technology');
      expect(titles).toContain('Services');
    });
  });

  describe('HEATMAP_WIDGET_CONFIG', () => {
    it('should have required properties', () => {
      expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('dataSource');
      expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('colorTheme');
      expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('width');
      expect(HEATMAP_WIDGET_CONFIG).toHaveProperty('height');
    });

    it('should use SPX500 as data source', () => {
      expect(HEATMAP_WIDGET_CONFIG.dataSource).toBe('SPX500');
    });

    it('should have proper boolean flags', () => {
      expect(typeof HEATMAP_WIDGET_CONFIG.isTransparent).toBe('boolean');
      expect(typeof HEATMAP_WIDGET_CONFIG.isZoomEnabled).toBe('boolean');
      expect(typeof HEATMAP_WIDGET_CONFIG.hasSymbolTooltip).toBe('boolean');
    });
  });

  describe('TOP_STORIES_WIDGET_CONFIG', () => {
    it('should have required properties', () => {
      expect(TOP_STORIES_WIDGET_CONFIG).toHaveProperty('displayMode');
      expect(TOP_STORIES_WIDGET_CONFIG).toHaveProperty('feedMode');
      expect(TOP_STORIES_WIDGET_CONFIG).toHaveProperty('market');
    });

    it('should be configured for stock market', () => {
      expect(TOP_STORIES_WIDGET_CONFIG.market).toBe('stock');
    });
  });

  describe('MARKET_DATA_WIDGET_CONFIG', () => {
    it('should have symbol groups', () => {
      expect(Array.isArray(MARKET_DATA_WIDGET_CONFIG.symbolsGroups)).toBe(true);
      expect(MARKET_DATA_WIDGET_CONFIG.symbolsGroups.length).toBeGreaterThan(0);
    });

    it('should have properly structured symbol groups', () => {
      MARKET_DATA_WIDGET_CONFIG.symbolsGroups.forEach(group => {
        expect(group).toHaveProperty('name');
        expect(group).toHaveProperty('symbols');
        expect(Array.isArray(group.symbols)).toBe(true);
      });
    });

    it('should have symbols with name and displayName', () => {
      MARKET_DATA_WIDGET_CONFIG.symbolsGroups.forEach(group => {
        group.symbols.forEach(symbol => {
          expect(symbol).toHaveProperty('name');
          expect(symbol).toHaveProperty('displayName');
        });
      });
    });
  });
});

describe('Widget Configuration Functions', () => {
  describe('SYMBOL_INFO_WIDGET_CONFIG', () => {
    it('should return a config object with uppercase symbol', () => {
      const config = SYMBOL_INFO_WIDGET_CONFIG('aapl');
      expect(config.symbol).toBe('AAPL');
    });

    it('should handle already uppercase symbols', () => {
      const config = SYMBOL_INFO_WIDGET_CONFIG('MSFT');
      expect(config.symbol).toBe('MSFT');
    });

    it('should have required properties', () => {
      const config = SYMBOL_INFO_WIDGET_CONFIG('test');
      expect(config).toHaveProperty('colorTheme');
      expect(config).toHaveProperty('locale');
      expect(config).toHaveProperty('width');
      expect(config).toHaveProperty('height');
    });

    it('should use dark theme', () => {
      const config = SYMBOL_INFO_WIDGET_CONFIG('test');
      expect(config.colorTheme).toBe('dark');
    });
  });

  describe('CANDLE_CHART_WIDGET_CONFIG', () => {
    it('should convert symbol to uppercase', () => {
      const config = CANDLE_CHART_WIDGET_CONFIG('googl');
      expect(config.symbol).toBe('GOOGL');
    });

    it('should have chart configuration properties', () => {
      const config = CANDLE_CHART_WIDGET_CONFIG('test');
      expect(config).toHaveProperty('interval');
      expect(config).toHaveProperty('theme');
      expect(config).toHaveProperty('style');
      expect(config).toHaveProperty('timezone');
    });

    it('should disable symbol change', () => {
      const config = CANDLE_CHART_WIDGET_CONFIG('test');
      expect(config.allow_symbol_change).toBe(false);
    });
  });

  describe('BASELINE_WIDGET_CONFIG', () => {
    it('should have baseline style', () => {
      const config = BASELINE_WIDGET_CONFIG('test');
      expect(config.style).toBe(10);
    });

    it('should convert symbol to uppercase', () => {
      const config = BASELINE_WIDGET_CONFIG('tesla');
      expect(config.symbol).toBe('TESLA');
    });
  });

  describe('TECHNICAL_ANALYSIS_WIDGET_CONFIG', () => {
    it('should have 1h interval by default', () => {
      const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('test');
      expect(config.interval).toBe('1h');
    });

    it('should convert symbol to uppercase', () => {
      const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('amzn');
      expect(config.symbol).toBe('AMZN');
    });
  });

  describe('COMPANY_PROFILE_WIDGET_CONFIG', () => {
    it('should have appropriate height for profile display', () => {
      const config = COMPANY_PROFILE_WIDGET_CONFIG('test');
      expect(config.height).toBe(440);
    });
  });

  describe('COMPANY_FINANCIALS_WIDGET_CONFIG', () => {
    it('should have displayMode set to regular', () => {
      const config = COMPANY_FINANCIALS_WIDGET_CONFIG('test');
      expect(config.displayMode).toBe('regular');
    });

    it('should have financials-specific height', () => {
      const config = COMPANY_FINANCIALS_WIDGET_CONFIG('test');
      expect(config.height).toBe(464);
    });
  });
});

describe('Stock Symbols', () => {
  describe('POPULAR_STOCK_SYMBOLS', () => {
    it('should be an array of strings', () => {
      expect(Array.isArray(POPULAR_STOCK_SYMBOLS)).toBe(true);
      POPULAR_STOCK_SYMBOLS.forEach(symbol => {
        expect(typeof symbol).toBe('string');
      });
    });

    it('should contain major tech stocks', () => {
      expect(POPULAR_STOCK_SYMBOLS).toContain('AAPL');
      expect(POPULAR_STOCK_SYMBOLS).toContain('MSFT');
      expect(POPULAR_STOCK_SYMBOLS).toContain('GOOGL');
      expect(POPULAR_STOCK_SYMBOLS).toContain('AMZN');
    });

    it('should have all uppercase symbols', () => {
      POPULAR_STOCK_SYMBOLS.forEach(symbol => {
        expect(symbol).toBe(symbol.toUpperCase());
      });
    });

    it('should have reasonable length (not empty, not too many)', () => {
      expect(POPULAR_STOCK_SYMBOLS.length).toBeGreaterThan(10);
      expect(POPULAR_STOCK_SYMBOLS.length).toBeLessThan(200);
    });

    it('should not have duplicates', () => {
      const uniqueSymbols = new Set(POPULAR_STOCK_SYMBOLS);
      expect(uniqueSymbols.size).toBe(POPULAR_STOCK_SYMBOLS.length);
    });
  });
});

describe('UI Constants', () => {
  describe('NO_MARKET_NEWS', () => {
    it('should be a string containing HTML', () => {
      expect(typeof NO_MARKET_NEWS).toBe('string');
      expect(NO_MARKET_NEWS).toContain('<p');
      expect(NO_MARKET_NEWS).toContain('</p>');
    });

    it('should contain appropriate message', () => {
      expect(NO_MARKET_NEWS).toContain('No market news');
    });
  });

  describe('WATCHLIST_TABLE_HEADER', () => {
    it('should be an array of strings', () => {
      expect(Array.isArray(WATCHLIST_TABLE_HEADER)).toBe(true);
      WATCHLIST_TABLE_HEADER.forEach(header => {
        expect(typeof header).toBe('string');
      });
    });

    it('should contain essential table columns', () => {
      expect(WATCHLIST_TABLE_HEADER).toContain('Company');
      expect(WATCHLIST_TABLE_HEADER).toContain('Symbol');
      expect(WATCHLIST_TABLE_HEADER).toContain('Price');
    });

    it('should have reasonable number of columns', () => {
      expect(WATCHLIST_TABLE_HEADER.length).toBeGreaterThan(3);
      expect(WATCHLIST_TABLE_HEADER.length).toBeLessThan(15);
    });
  });
});