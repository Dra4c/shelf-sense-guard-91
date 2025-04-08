
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, ListPlus } from 'lucide-react';
import { products as initialProducts } from '@/data/products';
import RestockList from '@/components/restock/RestockList';
import LowStockTab from '@/components/restock/LowStockTab';
import ActiveRestockSheet from '@/components/restock/ActiveRestockSheet';
import { useRestockManagement } from '@/hooks/useRestockManagement';

const Restock = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const {
    products,
    lowStockProducts,
    activeList,
    handleMarkAsRestocked,
    handleListCreated,
    handleConfirmRestock,
    handleCancelRestock
  } = useRestockManagement(initialProducts);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reposição</h1>
        <p className="text-muted-foreground">
          Gerencie a reposição de produtos nas prateleiras.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Itens para Repor
          </TabsTrigger>
          <TabsTrigger value="create" className="flex items-center gap-2">
            <ListPlus className="h-4 w-4" />
            Criar Lista
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-6">
          <LowStockTab 
            lowStockProducts={lowStockProducts} 
            onMarkAsRestocked={handleMarkAsRestocked} 
          />
        </TabsContent>
        
        <TabsContent value="create" className="mt-6">
          <RestockList 
            products={products} 
            onListCreated={handleListCreated} 
          />
        </TabsContent>
      </Tabs>
      
      <ActiveRestockSheet
        activeList={activeList}
        products={products}
        onClose={handleCancelRestock}
        onConfirm={handleConfirmRestock}
        onCancel={handleCancelRestock}
      />
    </div>
  );
};

export default Restock;
