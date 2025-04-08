
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Button } from '@/components/ui/button';
import { InfoIcon, RefreshCw } from 'lucide-react';
import RestockTabs from '@/components/restock/RestockTabs';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';
import OfflineIndicator from '@/components/status/OfflineIndicator';
import ActiveRestockSheet from '@/components/restock/ActiveRestockSheet';

interface ActiveRestockList {
  id: string;
  name: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
  }[];
  createdAt: Date;
  status: 'active' | 'completed' | 'cancelled';
}

const Restock = () => {
  const { toast: hookToast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeList, setActiveList] = useState<ActiveRestockList | null>(null);

  const handleProductStockChange = (productId: string, newQuantity: number) => {
    // Update product stock in the local state
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, currentStock: newQuantity } 
          : product
      )
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success('Dados atualizados com sucesso');
    }, 1000);
  };

  const handleListCreated = (list: any) => {
    // Set the active list to show the sheet
    setActiveList(list);
    
    hookToast({
      title: "Lista de reposição criada",
      description: `${list.items.length} produtos adicionados à lista de reposição.`,
    });
  };

  const handleConfirmRestock = () => {
    if (!activeList) return;
    
    // Process the restock confirmation
    toast.success(`Lista "${activeList.name}" concluída com sucesso`);
    
    // Clear active list
    setActiveList(null);
  };

  const handleCancelRestock = () => {
    if (!activeList) return;
    
    // Return stock to inventory if cancelling
    activeList.items.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        handleProductStockChange(item.productId, product.currentStock + item.quantity);
      }
    });
    
    toast.error(`Lista "${activeList.name}" foi cancelada`);
    
    // Clear active list
    setActiveList(null);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Reposição de Produtos"
        description="Crie e gerencie listas de reposição para produtos com estoque baixo."
      >
        <div className="flex items-center gap-4">
          <OfflineIndicator />
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </PageHeader>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4 p-2 bg-primary/10 rounded-md">
          <InfoIcon className="h-5 w-5 text-primary" />
          <p className="text-sm">
            Crie uma lista de reposição para produtos com estoque baixo ou que precisam ser movidos para as prateleiras.
          </p>
        </div>

        <RestockTabs 
          products={products}
          onListCreated={handleListCreated}
          onProductStockChange={handleProductStockChange}
        />
      </div>

      {/* Active Restock Sheet */}
      <ActiveRestockSheet 
        activeList={activeList}
        products={products}
        onClose={() => {}} // Empty function to prevent closing by clicking outside
        onConfirm={handleConfirmRestock}
        onCancel={handleCancelRestock}
      />
    </div>
  );
};

export default Restock;
