
import React from 'react';
import { Product } from '@/types';
import RestockList from './RestockList';

interface RestockTabsProps {
  products: Product[];
  onListCreated: (list: any) => void;
  onProductStockChange: (productId: string, newQuantity: number) => void;
}

const RestockTabs: React.FC<RestockTabsProps> = ({
  products,
  onListCreated,
  onProductStockChange,
}) => {
  return (
    <RestockList 
      products={products}
      onListCreated={onListCreated}
      onProductStockChange={onProductStockChange}
    />
  );
};

export default RestockTabs;
