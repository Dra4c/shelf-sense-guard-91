
import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import BatchItem from '@/components/batch/BatchItem';
import { batches } from '@/data/batches';
import { products } from '@/data/products';
import { Batch } from '@/types';
import { useToast } from '@/hooks/use-toast';

const Batches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Batch['status'] | 'all'>('all');
  const { toast } = useToast();

  const filteredBatches = batches.filter(batch => {
    const product = products.find(p => p.id === batch.productId);
    
    // Apply status filter
    if (statusFilter !== 'all' && batch.status !== statusFilter) {
      return false;
    }
    
    // Apply search filter
    if (searchTerm && product) {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batch.id.includes(searchTerm) ||
        batch.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return true;
  });

  const handleAddBatch = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "O cadastro de lotes estará disponível em breve.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lotes</h1>
          <p className="text-muted-foreground">
            Gerencie os lotes e acompanhe a validade dos produtos.
          </p>
        </div>
        <Button onClick={handleAddBatch} className="gap-1">
          <Plus className="h-4 w-4" />
          Novo Lote
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por produto, lote ou localização..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as any)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="ok">OK</SelectItem>
            <SelectItem value="expiring">Vencendo em 30 dias</SelectItem>
            <SelectItem value="expired">Vencidos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {filteredBatches.map((batch) => {
          const product = products.find(p => p.id === batch.productId);
          if (!product) return null;
          
          return (
            <BatchItem 
              key={batch.id} 
              batch={batch} 
              product={product} 
            />
          );
        })}
        
        {filteredBatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum lote encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batches;
