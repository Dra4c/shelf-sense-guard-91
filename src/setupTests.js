
// setupTests.js
import '@testing-library/jest-dom';

// Mock for Lucide React icons
jest.mock('lucide-react', () => ({
  Search: () => <svg data-testid="search-icon" />,
  Plus: () => <svg data-testid="plus-icon" />
}));
