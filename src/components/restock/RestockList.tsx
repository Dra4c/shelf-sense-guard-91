
import React, { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { useOffline } from '@/contexts/OfflineContext';
import RestockListHeader from './RestockListHeader';
import ListNameInput from './ListNameInput';
import ProductSection from './ProductSection';
import RestockListFooter from './RestockListFooter';

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

  const handleClearSelection = () => {
    setSelectedProducts(new Map());
  };

  const lowStockProducts = products.filter(product => product.currentStock < product.minStock);
  const otherProducts = products.filter(product => product.currentStock >= product.minStock);

  return (
    <Card className="w-full">
      <RestockListHeader />
      
      <CardContent className="space-y-4">
        <ListNameInput
          listName={listName}
          onListNameChange={setListName}
          onClear={handleClearSelection}
        />
        
        <ProductSection
          title="Produtos com Estoque Baixo"
          icon={<AlertTriangle className="h-4 w-4 mr-1" />}
          products={lowStockProducts}
          selectedProducts={selectedProducts}
          onProductSelect={handleProductSelect}
          isLowStock={true}
        />
        
        <ProductSection
          title="Outros Produtos"
          icon={<Plus className="h-4 w-4 mr-1" />}
          products={otherProducts}
          selectedProducts={selectedProducts}
          onProductSelect={handleProductSelect}
        />
      </CardContent>
      
      <RestockListFooter
        selectedProductsCount={selectedProducts.size}
        onSave={handleSaveList}
      />
    </Card>
  );
};

export default RestockList;
