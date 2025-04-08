
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductsHeader from '../ProductsHeader';

describe('ProductsHeader Component', () => {
  const mockOnAddProduct = jest.fn();
  
  beforeEach(() => {
    // Reset mock before each test
    mockOnAddProduct.mockClear();
  });
  
  test('renders desktop header correctly', () => {
    render(<ProductsHeader onAddProduct={mockOnAddProduct} isMobile={false} />);
    
    // Check for title and description
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Gerencie o catálogo de produtos do seu estabelecimento.')).toBeInTheDocument();
    
    // Check for "Novo Produto" button
    const addButton = screen.getByText('Novo Produto');
    expect(addButton).toBeInTheDocument();
  });
  
  test('renders mobile header correctly', () => {
    render(<ProductsHeader onAddProduct={mockOnAddProduct} isMobile={true} />);
    
    // Check for title and condensed description on mobile
    expect(screen.getByText('Produtos')).toBeInTheDocument();
    expect(screen.getByText('Gerencie seu catálogo')).toBeInTheDocument();
    
    // Check for condensed "Novo" button on mobile
    const addButton = screen.getByText('Novo');
    expect(addButton).toBeInTheDocument();
  });
  
  test('calls onAddProduct when button is clicked in desktop view', () => {
    render(<ProductsHeader onAddProduct={mockOnAddProduct} isMobile={false} />);
    
    const addButton = screen.getByText('Novo Produto');
    fireEvent.click(addButton);
    
    expect(mockOnAddProduct).toHaveBeenCalledTimes(1);
  });
  
  test('calls onAddProduct when button is clicked in mobile view', () => {
    render(<ProductsHeader onAddProduct={mockOnAddProduct} isMobile={true} />);
    
    const addButton = screen.getByText('Novo');
    fireEvent.click(addButton);
    
    expect(mockOnAddProduct).toHaveBeenCalledTimes(1);
  });
  
  test('button has correct size in mobile view', () => {
    render(<ProductsHeader onAddProduct={mockOnAddProduct} isMobile={true} />);
    
    const addButton = screen.getByText('Novo');
    expect(addButton).toHaveAttribute('class', expect.stringContaining('gap-1'));
  });
});
