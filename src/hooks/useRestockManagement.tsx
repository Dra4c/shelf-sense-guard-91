
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useOffline } from '@/contexts/OfflineContext';
import { Product } from '@/types';

interface RestockListItem {
  productId: string;
  name: string;
  quantity: number;
}

interface ActiveRestockList {
  id: string;
  name: string;
  items: RestockListItem[];
  createdAt: Date;
  status: 'active' | 'completed' | 'cancelled';
}

export function useRestockManagement(initialProducts: Product[]) {
  const [products, setProducts] = useState(initialProducts);
  const [activeList, setActiveList] = useState<ActiveRestockList | null>(null);
  const [restockHistory, setRestockHistory] = useState<ActiveRestockList[]>([]);
  const { toast } = useToast();
  const { isOffline, addPendingAction } = useOffline();

  // Low stock products
  const lowStockProducts = products.filter(product => product.currentStock < product.minStock);

  const handleMarkAsRestocked = (productId: string) => {
    // Log restock action
    if (isOffline) {
      addPendingAction({
        type: 'restock_product',
        data: { productId, timestamp: new Date().toISOString() }
      });
    }
    
    // Update local state
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          // In a real app, this would probably not update the current stock directly
          // but rather create a "restocked" flag or similar
          currentStock: product.minStock + 5, // Just for demo, add some stock
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    
    // Show success toast
    toast({
      title: "Produto reposto",
      description: "O produto foi marcado como reposto nas prateleiras.",
    });
  };
  
  const handleListCreated = (newList: ActiveRestockList) => {
    // Set the active list and show sheet
    setActiveList(newList);
    
    // Show success message
    toast({
      title: "Lista de reposição criada",
      description: `A lista "${newList.name}" está ativa e pronta para reposição.`,
    });
  };
  
  const handleConfirmRestock = () => {
    if (!activeList) return;
    
    // Complete the active list
    const completedList = {
      ...activeList,
      status: 'completed' as const
    };
    
    // Add to history
    setRestockHistory(prev => [completedList, ...prev]);
    
    // Process the restock confirmation
    if (isOffline) {
      addPendingAction({
        type: 'complete_restock_list',
        data: { listId: activeList.id, completedAt: new Date().toISOString() }
      });
    }
    
    // Clear active list
    setActiveList(null);
    
    // Show success toast
    toast({
      title: "Reposição concluída",
      description: `A lista "${activeList.name}" foi concluída com sucesso.`,
    });
  };
  
  const handleCancelRestock = () => {
    // Ask for confirmation
    if (window.confirm('Tem certeza que deseja cancelar esta lista de reposição?')) {
      if (!activeList) return;
      
      // Cancel the active list
      const cancelledList = {
        ...activeList,
        status: 'cancelled' as const
      };
      
      // Add to history
      setRestockHistory(prev => [cancelledList, ...prev]);
      
      const listName = activeList?.name;
      
      // Log cancellation
      if (isOffline && activeList) {
        addPendingAction({
          type: 'cancel_restock_list',
          data: { listId: activeList.id, cancelledAt: new Date().toISOString() }
        });
      }
      
      // Return stock to inventory if cancelling
      if (activeList) {
        const updatedProducts = [...products];
        
        activeList.items.forEach(item => {
          const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
          if (productIndex >= 0) {
            updatedProducts[productIndex] = {
              ...updatedProducts[productIndex],
              currentStock: updatedProducts[productIndex].currentStock + item.quantity
            };
          }
        });
        
        setProducts(updatedProducts);
      }
      
      // Clear active list
      setActiveList(null);
      
      // Show toast
      toast({
        title: "Lista cancelada",
        description: `A lista "${listName}" foi cancelada e o estoque foi restaurado.`,
        variant: "destructive"
      });
    }
  };
  
  const handleProductStockChange = (productId: string, newStock: number) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          currentStock: newStock
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
  };
  
  const handleViewHistoryList = (listId: string) => {
    const list = restockHistory.find(item => item.id === listId);
    if (list) {
      // Just show the list in a read-only view
      setActiveList({
        ...list,
        status: 'active' // Set to active so the sheet is displayed
      });
    }
  };
  
  return {
    products,
    lowStockProducts,
    activeList,
    restockHistory,
    handleMarkAsRestocked,
    handleListCreated,
    handleConfirmRestock,
    handleCancelRestock,
    handleProductStockChange,
    handleViewHistoryList
  };
}
