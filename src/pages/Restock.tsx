
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import RestockList from '@/components/restock/RestockList';
import RestockHistory from '@/components/restock/RestockHistory';
import ActiveRestockSheet from '@/components/restock/ActiveRestockSheet';
import { products } from '@/data/products';
import { useRestockManagement } from '@/hooks/useRestockManagement';
import { OfflineIndicator } from '@/components/status/OfflineIndicator';

const Restock = () => {
  const {
    products: managedProducts,
    lowStockProducts,
    activeList,
    restockHistory,
    handleMarkAsRestocked,
    handleListCreated,
    handleConfirmRestock,
    handleCancelRestock,
    handleProductStockChange,
    handleViewHistoryList
  } = useRestockManagement(products);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reposição</h1>
          <p className="text-muted-foreground">
            Crie listas de reposição e acompanhe itens que precisam ser repostos.
          </p>
        </div>
        <OfflineIndicator />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Lista de Reposição</h2>
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>

        <RestockList 
          products={managedProducts}
          onListCreated={handleListCreated}
          onProductStockChange={handleProductStockChange}
        />
      </div>

      {/* Display restock history */}
      <RestockHistory 
        history={restockHistory} 
        onViewList={handleViewHistoryList} 
      />

      {/* Active sheet for restock list */}
      <ActiveRestockSheet
        activeList={activeList}
        products={managedProducts}
        onClose={() => {}}
        onConfirm={handleConfirmRestock}
        onCancel={handleCancelRestock}
      />
    </div>
  );
};

export default Restock;
