
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Package } from 'lucide-react';
import { Batch, Product } from '@/types';
import StatusBadge from '../status/StatusBadge';

interface BatchItemProps {
  batch: Batch;
  product: Product;
}

const BatchItem: React.FC<BatchItemProps> = ({ batch, product }) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white hover:shadow-sm transition-shadow">
      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center text-primary">
        <Package className="h-6 w-6" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          Lote: {batch.id} • Local: {batch.location}
        </p>
      </div>
      
      <div className="flex flex-col items-end gap-1">
        <StatusBadge status={batch.status} />
        <p className="text-xs text-muted-foreground">
          Validade: {format(batch.expiryDate, 'dd/MM/yyyy', { locale: ptBR })}
        </p>
      </div>
    </div>
  );
};

export default BatchItem;
