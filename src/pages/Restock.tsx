
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { useToast } from '@/hooks/use-toast';
import { products as initialProducts } from '@/data/products';
import { useRestockManagement } from '@/hooks/useRestockManagement';
import RestockTabs from '@/components/restock/RestockTabs';
import ActiveRestockSheet from '@/components/restock/ActiveRestockSheet';

const Restock = () => {
  const [historyView, setHistoryView] = useState(false);
  const { toast } = useToast();
  
  const {
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
  } = useRestockManagement(initialProducts);

  const handleViewListFromHistory = (listId: string, isHistoryView = false) => {
    setHistoryView(isHistoryView);
    handleViewHistoryList(listId);
  };

  const handleCloseActiveList = () => {
    // Just resets the active list view state
    setHistoryView(false);
    // We'll need to implement a way to close the sheet here
    // This can be done by adding a public method to useRestockManagement
    // For now, we'll just set activeList to null
    if (activeList) {
      // This isn't ideal but works for now to maintain compatibility
      const listElement = document.querySelector('[data-state="open"]');
      if (listElement) {
        const closeButton = listElement.querySelector('[data-radix-collection-item]');
        if (closeButton) {
          (closeButton as HTMLElement).click();
        }
      }
    }
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
        historyList={restockHistory}
        onListCreated={handleListCreated}
        onMarkAsRestocked={handleMarkAsRestocked}
        onProductStockChange={handleProductStockChange}
        onViewList={handleViewListFromHistory}
      />
      
      <ActiveRestockSheet 
        activeList={activeList}
        products={products}
        onClose={handleCloseActiveList}
        onConfirm={handleConfirmRestock}
        onCancel={handleCancelRestock}
        historyView={historyView}
      />
    </div>
  );
};

export default Restock;
