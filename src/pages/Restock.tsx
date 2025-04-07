
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
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
import { products } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Restock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [restockedProducts, setRestockedProducts] = useState<string[]>([]);
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

  const handleMarkAsRestocked = (productId: string) => {
    setRestockedProducts([...restockedProducts, productId]);
    
    toast({
      title: "Produto marcado como reposto",
      description: "O estoque será atualizado em breve.",
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
      
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <RestockItem 
            key={product.id} 
            product={product} 
            onMarkAsRestocked={handleMarkAsRestocked}
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
