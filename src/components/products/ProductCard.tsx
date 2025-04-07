
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Barcode, Package } from 'lucide-react';
import { Product } from '@/types';
import StockIndicator from '../status/StockIndicator';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow animate-scale-in">
      <CardContent className="p-0">
        <div className="aspect-square w-full relative bg-gray-100">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-300" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold truncate">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            {product.category} • {product.brand}
          </p>
          
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Barcode className="h-3 w-3 mr-1" />
            <span>{product.barcode}</span>
          </div>
          
          <StockIndicator 
            current={product.currentStock} 
            minimum={product.minStock} 
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
