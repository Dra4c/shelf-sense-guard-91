
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const TopRestockedCard = () => {
  // Mock data for top and bottom selling products
  const topProducts = [
    { name: "Arroz 5kg", count: 28, trend: 'up' },
    { name: "Café 500g", count: 24, trend: 'up' },
    { name: "Feijão 1kg", count: 18, trend: 'down' },
    { name: "Açúcar 2kg", count: 15, trend: 'up' },
    { name: "Leite 1L", count: 12, trend: 'down' },
  ];
  
  const bottomProducts = [
    { name: "Azeite 500ml", count: 2, trend: 'down' },
    { name: "Sal 1kg", count: 3, trend: 'down' },
    { name: "Sabão em pó", count: 4, trend: 'up' },
    { name: "Detergente", count: 5, trend: 'down' },
    { name: "Papel Higiênico", count: 6, trend: 'up' },
  ];

  const renderProductItem = (product: typeof topProducts[0], index: number, isTop: boolean) => (
    <div 
      key={product.name} 
      className="flex items-center justify-between py-3 border-b last:border-0"
    >
      <div className="flex items-center">
        <div 
          className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 text-white font-medium ${
            isTop 
              ? "bg-gradient-to-br from-purple-500 to-indigo-600" 
              : "bg-gradient-to-br from-gray-400 to-gray-600"
          }`}
        >
          {index + 1}
        </div>
        <span className="font-medium">{product.name}</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold mr-2">{product.count}</span>
        {product.trend === 'up' ? (
          <TrendingUp className="w-4 h-4 text-status-ok" />
        ) : (
          <TrendingDown className="w-4 h-4 text-status-danger" />
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Produtos Mais Vendidos</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1 text-status-ok" />
              Mais Vendidos
            </h3>
            <div className="space-y-1">
              {topProducts.map((product, i) => renderProductItem(product, i, true))}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center">
              <TrendingDown className="w-4 h-4 mr-1 text-status-danger" />
              Menos Vendidos
            </h3>
            <div className="space-y-1">
              {bottomProducts.map((product, i) => renderProductItem(product, i, false))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopRestockedCard;
