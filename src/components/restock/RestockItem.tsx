
import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import StockIndicator from '@/components/status/StockIndicator';

interface RestockItemProps {
  product: Product;
  isSelected?: boolean;
  onSelect?: (isSelected: boolean, quantity?: number) => void;
  quantity?: number;
  isLowStock?: boolean;
  extraInfo?: React.ReactNode;
  onMarkAsRestocked?: (productId: string) => void; // Add the missing prop
}

const RestockItem: React.FC<RestockItemProps> = ({
  product,
  isSelected = false,
  onSelect = () => {},
  quantity = 1,
  isLowStock = false,
  extraInfo,
  onMarkAsRestocked
}) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  
  const handleQuantityChange = (newQuantity: number) => {
    // Don't allow quantity to go below 1 or above current stock
    const validQuantity = Math.max(1, Math.min(newQuantity, product.currentStock));
    setItemQuantity(validQuantity);
    if (isSelected) {
      onSelect(true, validQuantity);
    }
  };
  
  const handleSelect = (checked: boolean) => {
    onSelect(checked, itemQuantity);
  };

  return (
    <div className={`p-3 border rounded-md flex items-center ${isSelected ? 'bg-muted/50' : ''}`}>
      {onSelect && (
        <Checkbox 
          id={`product-${product.id}`}
          checked={isSelected}
          onCheckedChange={handleSelect}
          className="mr-3"
        />
      )}
      
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
          <label 
            htmlFor={`product-${product.id}`}
            className="font-medium cursor-pointer flex-1"
          >
            {product.name}
          </label>
          
          <div className="text-sm text-muted-foreground">
            Estoque: {product.currentStock}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {isLowStock && (
              <StockIndicator 
                current={product.currentStock} 
                minimum={product.minStock} 
                size="sm" 
              />
            )}
            {extraInfo}
          </div>
          
          {isSelected && onSelect && (
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => handleQuantityChange(itemQuantity - 1)}
                disabled={itemQuantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              
              <span className="w-8 text-center">
                {itemQuantity}
              </span>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-7 w-7"
                onClick={() => handleQuantityChange(itemQuantity + 1)}
                disabled={itemQuantity >= product.currentStock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          )}
          
          {onMarkAsRestocked && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMarkAsRestocked(product.id)}
            >
              Marcar como Reposto
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestockItem;
