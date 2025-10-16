# Test Suite Documentation

This directory contains comprehensive unit tests for the Stock Market application.

## Test Coverage

### Components Tests
- **TradingViewWidget.test.tsx**: Tests for the TradingView widget component
  - Rendering with and without title
  - Custom className handling
  - Height configuration
  - Memoization behavior
  - Hook integration

- **NavItems.test.tsx**: Tests for the navigation items component
  - Active link highlighting
  - Path matching logic
  - Responsive styling
  - Navigation structure

### Hooks Tests
- **useTradingViewWidget.test.tsx**: Tests for the custom TradingView hook
  - Script injection
  - Container management
  - Cleanup behavior
  - Configuration handling
  - Re-render scenarios

### Pages Tests
- **page.test.tsx**: Tests for the home page
  - Widget rendering
  - Layout structure
  - Section organization
  - URL construction

### Library Tests
- **constants.test.ts**: Tests for application constants
  - Navigation items validation
  - Form option structures
  - Widget configurations
  - Symbol lists
  - UI constants

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- TradingViewWidget.test.tsx
```

## Test Structure

Each test file follows these conventions:

1. **Describe blocks**: Group related tests
2. **Setup/Teardown**: Use beforeEach/afterEach for test isolation
3. **Mocking**: Mock external dependencies appropriately
4. **Assertions**: Use clear, descriptive assertions
5. **Edge cases**: Include tests for edge cases and error conditions

## Coverage Goals

- Minimum 80% code coverage
- 100% coverage for pure functions
- Critical path coverage for all features
- Edge case coverage for public APIs

## Best Practices

1. Keep tests focused and atomic
2. Use descriptive test names
3. Avoid testing implementation details
4. Mock external dependencies
5. Test user-facing behavior
6. Keep tests maintainable and readable