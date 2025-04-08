
import React, { useState } from 'react';
import { Check, ShoppingCart, Trash2, Save, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { useOffline } from '@/contexts/OfflineContext';
import RestockItem from './RestockItem';

interface RestockListProps {
  products: Product[];
  onListCreated?: () => void;
}

const RestockList: React.FC<RestockListProps> = ({ products, onListCreated }) => {
  const [listName, setListName] = useState('Lista de Reposição');
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(new Map());
  const { toast } = useToast();
  const { isOffline, addPendingAction } = useOffline();

  const handleProductSelect = (productId: string, isSelected: boolean, quantity: number = 1) => {
    const updatedProducts = new Map(selectedProducts);
    
    if (isSelected) {
      updatedProducts.set(productId, quantity);
    } else {
      updatedProducts.delete(productId);
    }
    
    setSelectedProducts(updatedProducts);
  };
  
  const handleSaveList = () => {
    if (selectedProducts.size === 0) {
      toast({
        title: "Nenhum produto selecionado",
        description: "Adicione pelo menos um produto à lista de reposição.",
        variant: "destructive"
      });
      return;
    }
    
    const restockItems = Array.from(selectedProducts.entries()).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return {
        productId,
        name: product?.name || 'Produto desconhecido',
        quantity
      };
    });
    
    const newList = {
      id: `list_${Date.now()}`,
      name: listName,
      items: restockItems,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    // In offline mode, add to pending actions
    if (isOffline) {
      addPendingAction({
        type: 'create_restock_list',
        data: newList
      });
    }
    
    // Show success message
    toast({
      title: "Lista de reposição criada",
      description: `A lista "${listName}" foi criada com ${restockItems.length} produtos.`,
    });
    
    // Reset form
    setSelectedProducts(new Map());
    setListName('Lista de Reposição');
    
    // Notify parent component
    if (onListCreated) {
      onListCreated();
    }
  };

  const lowStockProducts = products.filter(product => product.currentStock < product.minStock);
  const otherProducts = products.filter(product => product.currentStock >= product.minStock);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span>Criar Lista de Reposição</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Input 
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Nome da lista de reposição"
            className="flex-1"
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedProducts(new Map())}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Limpar
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2 text-red-500 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Produtos com Estoque Baixo
          </h3>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {lowStockProducts.length > 0 ? (
              lowStockProducts.map(product => (
                <RestockItem
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                  isSelected={selectedProducts.has(product.id)}
                  selectedQuantity={selectedProducts.get(product.id) || 1}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                Não há produtos com estoque baixo.
              </p>
            )}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-2 flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Outros Produtos
          </h3>
          
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {otherProducts.length > 0 ? (
              otherProducts.map(product => (
                <RestockItem
                  key={product.id}
                  product={product}
                  onSelect={handleProductSelect}
                  isSelected={selectedProducts.has(product.id)}
                  selectedQuantity={selectedProducts.get(product.id) || 1}
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground py-2">
                Não há outros produtos disponíveis.
              </p>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between border-t pt-4">
        <div className="text-sm">
          {selectedProducts.size} produtos selecionados
        </div>
        <Button onClick={handleSaveList}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Lista
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RestockList;

