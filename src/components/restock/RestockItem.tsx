
import React, { useState } from 'react';
import { CheckCircle2, CheckSquare, Square, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import StockIndicator from '../status/StockIndicator';
import { Input } from '@/components/ui/input';

interface RestockItemProps {
  product: Product;
  onMarkAsRestocked?: (productId: string) => void;
  onSelect?: (productId: string, selected: boolean, quantity: number) => void;
  isSelected?: boolean;
  selectedQuantity?: number;
}

const RestockItem: React.FC<RestockItemProps> = ({ 
  product, 
  onMarkAsRestocked,
  onSelect,
  isSelected = false,
  selectedQuantity = 1
}) => {
  const [quantity, setQuantity] = useState(selectedQuantity);

  const handleMarkAsRestocked = () => {
    if (onMarkAsRestocked) {
      onMarkAsRestocked(product.id);
    }
  };

  const handleSelectionChange = () => {
    if (onSelect) {
      onSelect(product.id, !isSelected, quantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const newQuantity = Math.max(1, Math.min(value, product.currentStock));
    setQuantity(newQuantity);
    
    if (isSelected && onSelect) {
      onSelect(product.id, true, newQuantity);
    }
  };

  const handleIncrement = () => {
    if (quantity < product.currentStock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      
      if (isSelected && onSelect) {
        onSelect(product.id, true, newQuantity);
      }
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      
      if (isSelected && onSelect) {
        onSelect(product.id, true, newQuantity);
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {onSelect && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleSelectionChange}
          >
            {isSelected ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
          </Button>
        )}
        <div className="min-w-0">
          <h3 className="font-medium truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {product.category} • {product.brand}
          </p>
          <StockIndicator 
            current={product.currentStock} 
            minimum={product.minStock} 
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isSelected && (
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              min={1}
              max={product.currentStock}
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-16 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        )}
      
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={handleMarkAsRestocked}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Reposto</span>
        </Button>
      </div>
    </div>
  );
};

export default RestockItem;
