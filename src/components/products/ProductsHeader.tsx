
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProductsHeaderProps {
  onAddProduct: () => void;
  isMobile: boolean;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ onAddProduct, isMobile }) => {
  if (isMobile) {
    return (
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background py-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Produtos</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie seu catálogo
          </p>
        </div>
        <Button size="sm" className="gap-1" onClick={onAddProduct}>
          <Plus className="h-4 w-4" />
          Novo
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
        <p className="text-muted-foreground">
          Gerencie o catálogo de produtos do seu estabelecimento.
        </p>
      </div>
      <Button onClick={onAddProduct} className="gap-1">
        <Plus className="h-4 w-4" />
        Novo Produto
      </Button>
    </div>
  );
};

export default ProductsHeader;
