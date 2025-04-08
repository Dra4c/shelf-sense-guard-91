
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import RestockList from '@/components/restock/RestockList';
import LowStockTab from '@/components/restock/LowStockTab';
import ActiveRestockSheet from '@/components/restock/ActiveRestockSheet';
import { products } from '@/data/products';
import { useRestockManagement } from '@/hooks/useRestockManagement';
import { OfflineIndicator } from '@/components/status/OfflineIndicator';

const Restock = () => {
  const [activeTab, setActiveTab] = useState('restocking');
  const {
    products: managedProducts,
    lowStockProducts,
    activeList,
    handleMarkAsRestocked,
    handleListCreated,
    handleConfirmRestock,
    handleCancelRestock
  } = useRestockManagement(products);

  // Reset to restocking tab when a list is created
  useEffect(() => {
    if (activeList) {
      setActiveTab('lowStock');
    }
  }, [activeList]);

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

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="lowStock">Lista Rápida</TabsTrigger>
            <TabsTrigger value="restocking">Criar Lista</TabsTrigger>
          </TabsList>

          {activeTab === 'lowStock' && (
            <Button variant="outline" size="sm" className="gap-1">
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
          )}
        </div>

        <TabsContent value="lowStock" className="m-0">
          <LowStockTab
            lowStockProducts={lowStockProducts}
            onMarkAsRestocked={handleMarkAsRestocked}
          />
        </TabsContent>

        <TabsContent value="restocking" className="m-0">
          <RestockList 
            products={managedProducts}
            onListCreated={handleListCreated}
          />
        </TabsContent>
      </Tabs>

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
