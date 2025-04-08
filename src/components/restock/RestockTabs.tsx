
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/types';
import RestockList from './RestockList';
import LowStockTab from './LowStockTab';
import RestockHistory from './RestockHistory';

interface RestockTabsProps {
  products: Product[];
  lowStockProducts: Product[];
  historyList: any[];
  onListCreated: (list: any) => void;
  onMarkAsRestocked: (productId: string) => void;
  onProductStockChange: (productId: string, newQuantity: number) => void;
  onViewList: (listId: string, historyView?: boolean) => void;
}

const RestockTabs: React.FC<RestockTabsProps> = ({
  products,
  lowStockProducts,
  historyList,
  onListCreated,
  onMarkAsRestocked,
  onProductStockChange,
  onViewList,
}) => {
  return (
    <Tabs defaultValue="new">
      <TabsList>
        <TabsTrigger value="new">Nova Lista</TabsTrigger>
        <TabsTrigger value="active">Lista Ativa</TabsTrigger>
        <TabsTrigger value="history">Histórico</TabsTrigger>
      </TabsList>
      
      <TabsContent value="new" className="space-y-4">
        <RestockList 
          products={products}
          onListCreated={onListCreated}
          onProductStockChange={onProductStockChange}
        />
      </TabsContent>
      
      <TabsContent value="active" className="space-y-4">
        <LowStockTab 
          lowStockProducts={lowStockProducts}
          onMarkAsRestocked={onMarkAsRestocked}
        />
      </TabsContent>
      
      <TabsContent value="history" className="space-y-4">
        <RestockHistory 
          history={historyList}
          onViewList={onViewList}
        />
      </TabsContent>
    </Tabs>
  );
};

export default RestockTabs;
