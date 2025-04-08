
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import RestockList from '@/components/restock/RestockList';
import LowStockTab from '@/components/restock/LowStockTab';
import ActiveRestockSheet from '@/components/restock/ActiveRestockSheet';
import RestockHistory from '@/components/restock/RestockHistory';
import { products as initialProducts } from '@/data/products';
import { useRestockHistory } from '@/hooks/useRestockHistory';

const Restock = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [activeList, setActiveList] = useState<any>(null);
  const [historyView, setHistoryView] = useState(false);
  const { toast } = useToast();
  const { historyList, addToHistory, updateHistoryItem } = useRestockHistory();

  React.useEffect(() => {
    // Filter low stock products
    const lowStock = products.filter(p => p.currentStock < p.minStock);
    setLowStockProducts(lowStock);
  }, [products]);

  const handleListCreated = (list: any) => {
    setActiveList(list);
    
    // Add to history
    const listWithCount = {
      ...list,
      itemCount: list.items.length
    };
    
    addToHistory(listWithCount);
    
    toast({
      title: "Lista de reposição criada",
      description: `Lista "${list.name}" com ${list.items.length} produtos foi criada com sucesso.`
    });
  };

  const handleMarkAsRestocked = (productId: string) => {
    // In a real app, this would update the database
    // For this demo, we'll just update the local state
    
    setLowStockProducts(prev => prev.filter(p => p.id !== productId));
    
    toast({
      title: "Produto reposto",
      description: "Produto marcado como reposto com sucesso."
    });
  };

  const handleProductStockChange = (productId: string, newQuantity: number) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === productId ? { ...p, currentStock: newQuantity } : p
      )
    );
  };

  const handleListConfirmed = () => {
    if (!activeList) return;
    
    // Update list status
    const updatedList = { ...activeList, status: 'completed' };
    
    // Update history
    updateHistoryItem(updatedList.id, { status: 'completed' });
    
    setActiveList(null);
    
    toast({
      title: "Reposição concluída",
      description: "Lista de reposição marcada como concluída com sucesso."
    });
  };

  const handleListCancelled = () => {
    if (!activeList) return;
    
    // Update list status
    const updatedList = { ...activeList, status: 'cancelled' };
    
    // Update history
    updateHistoryItem(updatedList.id, { status: 'cancelled' });
    
    // Return products to inventory
    activeList.items.forEach((item: any) => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        handleProductStockChange(item.productId, product.currentStock + item.quantity);
      }
    });
    
    setActiveList(null);
    
    toast({
      title: "Reposição cancelada",
      description: "Lista de reposição cancelada. Os produtos foram devolvidos ao estoque."
    });
  };

  const handleViewListFromHistory = (listId: string, isHistoryView = false) => {
    const list = historyList.find(item => item.id === listId);
    if (list) {
      setHistoryView(isHistoryView);
      setActiveList(list);
    }
  };

  const handleCloseActiveList = () => {
    setActiveList(null);
    setHistoryView(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reposição de Produtos"
        description="Gerencie a reposição de produtos nas prateleiras"
      />
      
      <RestockTabs 
        products={products}
        lowStockProducts={lowStockProducts}
        historyList={historyList}
        onListCreated={handleListCreated}
        onMarkAsRestocked={handleMarkAsRestocked}
        onProductStockChange={handleProductStockChange}
        onViewList={handleViewListFromHistory}
      />
      
      <ActiveRestockSheet 
        activeList={activeList}
        products={products}
        onClose={handleCloseActiveList}
        onConfirm={handleListConfirmed}
        onCancel={handleListCancelled}
        historyView={historyView}
      />
    </div>
  );
};

export default Restock;
