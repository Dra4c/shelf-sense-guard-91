
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types';
import StockIndicator from '../status/StockIndicator';
import { products } from '@/data/mockData';

// Get low stock products
const getLowStockProducts = () => {
  return products
    .filter(product => product.currentStock < product.minStock)
    .slice(0, 5); // Limit to 5 items
};

const LowStockCard = () => {
  const lowStockProducts = getLowStockProducts();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Estoque Baixo</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {lowStockProducts.length > 0 ? (
            <ul className="divide-y">
              {lowStockProducts.map((product) => (
                <li key={product.id} className="flex items-center justify-between py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-sm">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.category} • {product.brand}
                      </p>
                    </div>
                  </div>
                  <StockIndicator 
                    current={product.currentStock} 
                    minimum={product.minStock} 
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              Não há produtos com estoque baixo no momento.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockCard;
