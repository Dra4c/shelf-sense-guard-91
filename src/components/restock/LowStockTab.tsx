
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Product } from '@/types';
import RestockItem from './RestockItem';

interface LowStockTabProps {
  lowStockProducts: Product[];
  onMarkAsRestocked: (productId: string) => void;
}

const LowStockTab: React.FC<LowStockTabProps> = ({ 
  lowStockProducts,
  onMarkAsRestocked
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Reposição Ativa</CardTitle>
        <CardDescription>
          Produtos com estoque baixo que precisam ser repostos nas prateleiras.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {lowStockProducts.length > 0 ? (
          lowStockProducts.map(product => (
            <RestockItem
              key={product.id}
              product={product}
              onMarkAsRestocked={onMarkAsRestocked}
              isLowStock={true}
            />
          ))
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            Não há produtos para reposição no momento. Todos os produtos estão com estoque adequado.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LowStockTab;
