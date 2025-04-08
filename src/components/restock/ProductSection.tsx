
import React from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { Product } from '@/types';
import RestockItem from './RestockItem';

interface ProductSectionProps {
  title: string;
  icon: React.ReactNode;
  products: Product[];
  selectedProducts: Map<string, number>;
  onProductSelect: (productId: string, isSelected: boolean, quantity: number) => void;
  isLowStock?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({ 
  title, 
  icon, 
  products, 
  selectedProducts, 
  onProductSelect,
  isLowStock = false 
}) => {
  return (
    <div className="border-t pt-4">
      <h3 className={`font-medium mb-2 flex items-center ${isLowStock ? 'text-red-500' : ''}`}>
        {icon}
        {title}
      </h3>
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {products.length > 0 ? (
          products.map(product => (
            <RestockItem
              key={product.id}
              product={product}
              onSelect={onProductSelect}
              isSelected={selectedProducts.has(product.id)}
              selectedQuantity={selectedProducts.get(product.id) || 1}
            />
          ))
        ) : (
          <p className="text-sm text-muted-foreground py-2">
            {isLowStock ? 'Não há produtos com estoque baixo.' : 'Não há outros produtos disponíveis.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
