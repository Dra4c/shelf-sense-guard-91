import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Filter, Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import MovementsTable from '@/components/movements/MovementsTable';
import { useOffline } from '@/contexts/OfflineContext';
import { movements } from '@/data/mockData';

const Movements = () => {
  const { isOffline } = useOffline();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [userFilter, setUserFilter] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState(movements);

  const applyFilters = () => {
    let filtered = movements;
    
    if (searchTerm) {
      filtered = filtered.filter(
        item => item.productId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (typeFilter) {
      filtered = filtered.filter(item => item.type === typeFilter);
    }
    
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getDate() === filterDate.getDate() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getFullYear() === filterDate.getFullYear()
        );
      });
    }
    
    if (userFilter) {
      filtered = filtered.filter(item => item.userId === userFilter);
    }
    
    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter(undefined);
    setDateFilter(undefined);
    setUserFilter(undefined);
    setFilteredData(movements);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Histórico de Movimentações</h1>
        <p className="text-muted-foreground">
          Registros de entradas, saídas, perdas e reposições de estoque.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="product">Produto</Label>
              <Input
                id="product"
                placeholder="Buscar produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Tipo de movimentação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entrada</SelectItem>
                  <SelectItem value="exit">Saída</SelectItem>
                  <SelectItem value="loss">Perda</SelectItem>
                  <SelectItem value="restock">Reposição</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFilter && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "dd/MM/yyyy") : <span>Escolha uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFilter}
                    onSelect={setDateFilter}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="user">Usuário</Label>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger id="user">
                  <SelectValue placeholder="Todos os usuários" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">João Silva</SelectItem>
                  <SelectItem value="user2">Maria Oliveira</SelectItem>
                  <SelectItem value="user3">Carlos Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={resetFilters}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Limpar
            </Button>
            <Button onClick={applyFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      <MovementsTable data={filteredData} isOffline={isOffline} />
    </div>
  );
};

export default Movements;
