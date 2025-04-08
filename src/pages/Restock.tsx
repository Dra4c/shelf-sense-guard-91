
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import RestockList from '@/components/restock/RestockList';
import LowStockTab from '@/components/restock/LowStockTab';
import ActiveRestockSheet from '@/components/restock/ActiveRestockSheet';
import RestockHistory from '@/components/restock/RestockHistory';
import { products as initialProducts } from '@/data/products';

// Mock history data
const historyData = [
  {
    id: 'hist_1',
    name: 'Reposição Semanal',
    createdAt: new Date(2025, 3, 1, 10, 30),
    status: 'completed' as const,
    itemCount: 12,
    items: [
      { productId: 'prod_1', name: 'Produto 1', quantity: 5 },
      { productId: 'prod_2', name: 'Produto 2', quantity: 7 }
    ]
  },
  {
    id: 'hist_2',
    name: 'Reposição Prioridades',
    createdAt: new Date(2025, 3, 5, 9, 15),
    status: 'cancelled' as const,
    itemCount: 5,
    items: [
      { productId: 'prod_3', name: 'Produto 3', quantity: 2 },
      { productId: 'prod_4', name: 'Produto 4', quantity: 3 }
    ]
  },
  {
    id: 'hist_3',
    name: 'Reposição Emergencial',
    createdAt: new Date(2025, 3, 7, 14, 45),
    status: 'active' as const,
    itemCount: 3,
    items: [
      { productId: 'prod_5', name: 'Produto 5', quantity: 1 },
      { productId: 'prod_6', name: 'Produto 6', quantity: 2 }
    ]
  }
];

const Restock = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [activeList, setActiveList] = useState<any>(null);
  const [historyList, setHistoryList] = useState<any[]>(historyData);
  const [historyView, setHistoryView] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
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
    
    setHistoryList([listWithCount, ...historyList]);
    
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
    setHistoryList(prev => 
      prev.map(item => 
        item.id === updatedList.id ? { ...item, status: 'completed' } : item
      )
    );
    
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
    setHistoryList(prev => 
      prev.map(item => 
        item.id === updatedList.id ? { ...item, status: 'cancelled' } : item
      )
    );
    
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
      
      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new">Nova Lista</TabsTrigger>
          <TabsTrigger value="active">Lista Ativa</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="new" className="space-y-4">
          <RestockList 
            products={products}
            onListCreated={handleListCreated}
            onProductStockChange={handleProductStockChange}
          />
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <LowStockTab 
            lowStockProducts={lowStockProducts}
            onMarkAsRestocked={handleMarkAsRestocked}
          />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <RestockHistory 
            history={historyList}
            onViewList={handleViewListFromHistory}
          />
        </TabsContent>
      </Tabs>
      
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
