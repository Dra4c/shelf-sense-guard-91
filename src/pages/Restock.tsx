
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, ListPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { products as initialProducts } from '@/data/products';
import RestockItem from '@/components/restock/RestockItem';
import RestockList from '@/components/restock/RestockList';
import { useToast } from '@/hooks/use-toast';
import { useOffline } from '@/contexts/OfflineContext';

const Restock = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [products, setProducts] = useState(initialProducts);
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
  
  const handleListCreated = () => {
    // Switch to the active tab to show pending restocks
    setActiveTab('active');
  };

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
          <Card>
            <CardHeader>
              <CardTitle>Lista de Reposição Ativa</CardTitle>
              <CardDescription>
                Produtos com estoque baixo que precisam ser repostos nas prateleiras.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map(product => (
                  <RestockItem
                    key={product.id}
                    product={product}
                    onMarkAsRestocked={handleMarkAsRestocked}
                  />
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  Não há produtos para reposição no momento. Todos os produtos estão com estoque adequado.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create" className="mt-6">
          <RestockList products={products} onListCreated={handleListCreated} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Restock;
