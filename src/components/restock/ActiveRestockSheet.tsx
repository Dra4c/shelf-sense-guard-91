
import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import RestockListHeader from './RestockListHeader';
import RestockListFooter from './RestockListFooter';
import { Product } from '@/types';
import { format } from 'date-fns';

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
  status?: 'active' | 'completed' | 'cancelled';
}

interface ActiveRestockSheetProps {
  activeList: ActiveRestockList | null;
  products: Product[];
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const ActiveRestockSheet: React.FC<ActiveRestockSheetProps> = ({
  activeList,
  products,
  onClose,
  onConfirm,
  onCancel
}) => {
  if (!activeList) return null;

  const isCompleted = activeList.status === 'completed';
  const isCancelled = activeList.status === 'cancelled';
  const isReadOnly = isCompleted || isCancelled;

  const getStatusLabel = () => {
    if (isCompleted) return "Concluída";
    if (isCancelled) return "Cancelada";
    return "Em andamento";
  };

  return (
    <Sheet open={!!activeList} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md">
        <Card className="w-full border-none shadow-none">
          <RestockListHeader activeList={true} startTime={activeList.createdAt} />
          
          <CardContent className="space-y-4">
            <div className="pb-2 border-b">
              <div className="flex items-center justify-between">
                <p className="font-medium">{activeList.name}</p>
                {activeList.status && (
                  <span className={`text-sm px-2 py-1 rounded ${
                    isCompleted ? 'bg-status-ok/10 text-status-ok' : 
                    isCancelled ? 'bg-status-danger/10 text-status-danger' : 
                    'bg-status-warning/10 text-status-warning'
                  }`}>
                    {getStatusLabel()}
                  </span>
                )}
              </div>
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
                      <p className="text-sm text-muted-foreground">Quantidade para repor: {item.quantity}</p>
                      {product?.expiryDate && (
                        <div className="text-xs flex items-center text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Validade: {format(new Date(product.expiryDate), 'dd/MM/yyyy')}</span>
                        </div>
                      )}
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
          
          {!isReadOnly && (
            <RestockListFooter
              selectedProductsCount={activeList.items.length}
              onSave={() => {}}
              activeList={true}
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          )}
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default ActiveRestockSheet;
