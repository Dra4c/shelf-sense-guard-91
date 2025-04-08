
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductSearch from '../ProductSearch';

describe('ProductSearch Component', () => {
  const mockOnSearchChange = jest.fn();
  
  beforeEach(() => {
    // Reset mock before each test
    mockOnSearchChange.mockClear();
  });
  
  test('renders search input with correct placeholder', () => {
    render(<ProductSearch searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar por nome ou código...');
    expect(searchInput).toBeInTheDocument();
  });
  
  test('displays search term correctly', () => {
    const searchTerm = 'test product';
    render(<ProductSearch searchTerm={searchTerm} onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByDisplayValue(searchTerm);
    expect(searchInput).toBeInTheDocument();
  });
  
  test('calls onSearchChange when input value changes', () => {
    render(<ProductSearch searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Buscar por nome ou código...');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('new search');
  });
  
  test('renders search icon', () => {
    render(<ProductSearch searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    // Search for the SVG icon by test ID or role
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeInTheDocument();
  });
});
