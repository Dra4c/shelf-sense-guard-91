
import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { type Movement } from '@/types';
import { ArrowDownUp, ArrowUpLeft, PackageMinus, Package } from 'lucide-react';

interface MovementsTableProps {
  data: Movement[];
  isOffline: boolean;
}

const MovementsTable: React.FC<MovementsTableProps> = ({ data, isOffline }) => {
  // In a real app, pagination would be implemented here
  const paginatedData = data.slice(0, 10);

  const getMovementTypeDetails = (type: string) => {
    switch (type) {
      case 'entry':
        return { label: 'Entrada', icon: <Package className="h-4 w-4" />, color: 'bg-green-100 text-green-800' };
      case 'exit':
        return { label: 'Saída', icon: <ArrowUpLeft className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' };
      case 'loss':
        return { label: 'Perda', icon: <PackageMinus className="h-4 w-4" />, color: 'bg-red-100 text-red-800' };
      case 'restock':
        return { label: 'Reposição', icon: <ArrowDownUp className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' };
      default:
        return { label: type, icon: null, color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableCaption>Histórico de movimentações de produtos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-center">Quantidade</TableHead>
              <TableHead>Lote</TableHead>
              <TableHead>Data/Hora</TableHead>
              <TableHead>Usuário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((movement) => {
                const { label, icon, color } = getMovementTypeDetails(movement.type);
                
                return (
                  <TableRow key={movement.id} className="group">
                    <TableCell className="font-medium">
                      {movement.productId}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`flex w-fit items-center gap-1 ${color}`}>
                        {icon}
                        {label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{movement.quantity}</TableCell>
                    <TableCell>{movement.batchId || '-'}</TableCell>
                    <TableCell>
                      {format(new Date(movement.date), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{movement.userId || 'Sistema'}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MovementsTable;
