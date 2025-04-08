
import React from 'react';
import { Product } from '@/types';
import RestockItem from './RestockItem';

interface ProductSectionProps {
  title: string;
  icon: React.ReactNode;
  products: Product[];
  selectedProducts: Map<string, number>;
  onProductSelect: (productId: string, isSelected: boolean, quantity?: number) => void;
  isLowStock?: boolean;
  renderExtraInfo?: (product: Product) => React.ReactNode;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  icon,
  products,
  selectedProducts,
  onProductSelect,
  isLowStock = false,
  renderExtraInfo
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium flex items-center">
        {icon}
        {title} ({products.length})
      </h3>
      
      <div className="space-y-2">
        {products.map(product => (
          <RestockItem
            key={product.id}
            product={product}
            isSelected={selectedProducts.has(product.id)}
            onSelect={(isSelected, quantity) => onProductSelect(product.id, isSelected, quantity)}
            quantity={selectedProducts.get(product.id) || 1}
            isLowStock={isLowStock}
            extraInfo={renderExtraInfo ? renderExtraInfo(product) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
