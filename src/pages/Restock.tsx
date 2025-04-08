
import React, { useState } from 'react';
import { Search, Filter, CheckSquare, Truck, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import RestockItem from '@/components/restock/RestockItem';
import { products, batches, movements } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, Movement } from '@/types';

const Restock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [restockedProducts, setRestockedProducts] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<{id: string, quantity: number}[]>([]);
  const { toast } = useToast();

  // Get all product categories
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  // Filter products that need restocking
  const lowStockProducts = products.filter(product => 
    product.currentStock < product.minStock && 
    !restockedProducts.includes(product.id)
  );
  
  const filteredProducts = lowStockProducts.filter(product => {
    // Apply category filter
    if (categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm) {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  const handleProductSelection = (productId: string, selected: boolean, quantity: number) => {
    if (selected) {
      // Add to selected products
      setSelectedProducts((prev) => {
        const existing = prev.find(p => p.id === productId);
        if (existing) {
          return prev.map(p => p.id === productId ? {...p, quantity} : p);
        } else {
          return [...prev, {id: productId, quantity}];
        }
      });
    } else {
      // Remove from selected products
      setSelectedProducts((prev) => prev.filter(p => p.id !== productId));
    }
  };

  const handleMarkAsRestocked = (productId: string) => {
    setRestockedProducts([...restockedProducts, productId]);
    
    toast({
      title: "Produto marcado como reposto",
      description: "O estoque será atualizado em breve.",
    });
  };

  const handleConfirmRestock = () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "Nenhum produto selecionado",
        description: "Selecione ao menos um produto para reposição.",
        variant: "destructive"
      });
      return;
    }

    // Update products stock
    const now = new Date();
    selectedProducts.forEach(selected => {
      const productToUpdate = products.find(p => p.id === selected.id);
      if (productToUpdate) {
        // Decrease stock
        productToUpdate.currentStock -= selected.quantity;
        
        // Add movement record
        const newMovementId = (movements.length + 1).toString();
        movements.push({
          id: newMovementId,
          productId: selected.id,
          type: "restock",
          quantity: selected.quantity,
          date: now,
          notes: "Reposição nas prateleiras"
        });
      }
    });

    // Mark products as restocked
    const productIds = selectedProducts.map(p => p.id);
    setRestockedProducts([...restockedProducts, ...productIds]);
    setSelectedProducts([]);
    
    toast({
      title: "Reposição confirmada",
      description: `${selectedProducts.length} produto(s) repostos com sucesso.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reposição</h1>
        <p className="text-muted-foreground">
          Lista de produtos que precisam ser repostos nas prateleiras.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar produto..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'Todas as Categorias' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              <span>Produtos Selecionados ({selectedProducts.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {selectedProducts.map(selected => {
                const product = products.find(p => p.id === selected.id);
                return (
                  <div key={selected.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <span className="font-medium">{product?.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        Quantidade: {selected.quantity}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleProductSelection(selected.id, false, 0)}
                    >
                      Remover
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleConfirmRestock} className="gap-2">
              <Truck className="h-4 w-4" />
              Confirmar Reposição
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <RestockItem 
            key={product.id} 
            product={product} 
            onMarkAsRestocked={handleMarkAsRestocked}
            onSelect={handleProductSelection}
            isSelected={!!selectedProducts.find(p => p.id === product.id)}
            selectedQuantity={selectedProducts.find(p => p.id === product.id)?.quantity || 1}
          />
        ))}
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {lowStockProducts.length === 0 
                ? "Não há produtos que precisem de reposição no momento." 
                : "Nenhum produto encontrado com os filtros aplicados."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restock;
