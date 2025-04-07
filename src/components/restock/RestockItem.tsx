
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import StockIndicator from '../status/StockIndicator';

interface RestockItemProps {
  product: Product;
  onMarkAsRestocked?: (productId: string) => void;
}

const RestockItem: React.FC<RestockItemProps> = ({ 
  product, 
  onMarkAsRestocked 
}) => {
  const handleMarkAsRestocked = () => {
    if (onMarkAsRestocked) {
      onMarkAsRestocked(product.id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3 flex-1 min-w-0">
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
  );
};

export default RestockItem;
