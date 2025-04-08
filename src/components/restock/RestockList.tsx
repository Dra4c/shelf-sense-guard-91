
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { useOffline } from '@/contexts/OfflineContext';
import RestockListHeader from './RestockListHeader';
import ListNameInput from './ListNameInput';
import ProductSection from './ProductSection';
import RestockListFooter from './RestockListFooter';
import RestockSearch from './RestockSearch';
import ConfirmationDialog from '../ui/confirmation-dialog';

interface RestockListProps {
  products: Product[];
  onListCreated?: (list: any) => void;
  onProductStockChange?: (productId: string, newQuantity: number) => void;
}

const RestockList: React.FC<RestockListProps> = ({ 
  products, 
  onListCreated,
  onProductStockChange 
}) => {
  const [listName, setListName] = useState('Lista de Reposição');
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(new Map());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();
  const { isOffline, addPendingAction } = useOffline();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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
    
    // Show confirmation dialog
    setShowConfirmation(true);
  };

  const confirmSaveList = () => {
    const restockItems = Array.from(selectedProducts.entries()).map(([productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      
      // Decrease product stock
      if (onProductStockChange && product) {
        onProductStockChange(productId, product.currentStock - quantity);
      }
      
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
      createdAt: new Date(),
      status: 'active'
    };
    
    // In offline mode, add to pending actions
    if (isOffline) {
      addPendingAction({
        type: 'create_restock_list',
        data: newList
      });
    }
    
    // Reset form for next time
    setSelectedProducts(new Map());
    setListName('Lista de Reposição');
    setShowConfirmation(false);
    
    // Notify parent component with the full list object
    if (onListCreated) {
      onListCreated(newList);
    }
  };

  const handleClearSelection = () => {
    setSelectedProducts(new Map());
  };

  const handleSearchResults = (results: Product[]) => {
    setFilteredProducts(results);
  };

  const lowStockProducts = filteredProducts.filter(product => product.currentStock < product.minStock);
  const otherProducts = filteredProducts.filter(product => product.currentStock >= product.minStock);

  return (
    <>
      <Card className="w-full">
        <RestockListHeader />
        
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <ListNameInput
              listName={listName}
              onListNameChange={setListName}
              onClear={handleClearSelection}
            />
            
            <RestockSearch 
              products={products} 
              onSearchResults={handleSearchResults} 
            />
          </div>
          
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
      
      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        title="Criar Lista de Reposição"
        description="Ao criar essa lista, os produtos serão retirados do estoque. Deseja continuar?"
        onConfirm={confirmSaveList}
        confirmLabel="Criar Lista"
        cancelLabel="Cancelar"
      />
    </>
  );
};

export default RestockList;
