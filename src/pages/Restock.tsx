
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, ListPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { products as initialProducts } from '@/data/products';
import RestockItem from '@/components/restock/RestockItem';
import RestockList from '@/components/restock/RestockList';
import { useToast } from '@/hooks/use-toast';
import { useOffline } from '@/contexts/OfflineContext';
import { Sheet, SheetContent } from '@/components/ui/sheet';

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
}

const Restock = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [products, setProducts] = useState(initialProducts);
  const [activeList, setActiveList] = useState<ActiveRestockList | null>(null);
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
    
    // Process the restock confirmation
    if (isOffline) {
      addPendingAction({
        type: 'complete_restock_list',
        data: { listId: activeList.id, completedAt: new Date().toISOString() }
      });
    }
    
    // Update local products state (mark as restocked)
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
    
    // Clear active list
    setActiveList(null);
    
    // Show success toast
    toast({
      title: "Reposição concluída",
      description: `A lista "${activeList.name}" foi concluída com sucesso.`,
    });
    
    // Switch to active tab
    setActiveTab('active');
  };
  
  const handleCancelRestock = () => {
    // Ask for confirmation
    if (window.confirm('Tem certeza que deseja cancelar esta lista de reposição?')) {
      const listName = activeList?.name;
      
      // Log cancellation
      if (isOffline && activeList) {
        addPendingAction({
          type: 'cancel_restock_list',
          data: { listId: activeList.id, cancelledAt: new Date().toISOString() }
        });
      }
      
      // Clear active list
      setActiveList(null);
      
      // Show toast
      toast({
        title: "Lista cancelada",
        description: `A lista "${listName}" foi cancelada.`,
        variant: "destructive"
      });
      
      // Switch to active tab
      setActiveTab('active');
    }
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
          <RestockList 
            products={products} 
            onListCreated={handleListCreated} 
          />
        </TabsContent>
      </Tabs>
      
      {/* Sheet for active restock list */}
      <Sheet open={!!activeList} onOpenChange={(open) => !open && handleCancelRestock()}>
        <SheetContent className="w-full sm:max-w-md">
          {activeList && (
            <Card className="w-full border-none shadow-none">
              <RestockListHeader activeList={true} startTime={activeList.createdAt} />
              
              <CardContent className="space-y-4">
                <div className="pb-2 border-b">
                  <p className="font-medium">{activeList.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Criada em {activeList.createdAt.toLocaleTimeString()}
                  </p>
                </div>
                
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                  {activeList.items.map((item) => {
                    const product = products.find(p => p.id === item.productId);
                    
                    return (
                      <div key={item.productId} className="flex items-center justify-between p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                        </div>
                        {product && (
                          <div className="text-sm text-right">
                            <p>Estoque: {product.currentStock}</p>
                            <p>Mínimo: {product.minStock}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              
              <RestockListFooter
                selectedProductsCount={activeList.items.length}
                onSave={() => {}}
                activeList={true}
                onConfirm={handleConfirmRestock}
                onCancel={handleCancelRestock}
              />
            </Card>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Restock;
