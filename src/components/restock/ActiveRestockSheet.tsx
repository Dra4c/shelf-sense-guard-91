
import React from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Share2, FileText } from 'lucide-react';
import RestockListHeader from './RestockListHeader';
import RestockListFooter from './RestockListFooter';
import { Product } from '@/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

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
  historyView?: boolean;
}

const ActiveRestockSheet: React.FC<ActiveRestockSheetProps> = ({
  activeList,
  products,
  onClose,
  onConfirm,
  onCancel,
  historyView = false
}) => {
  if (!activeList) return null;

  const isCompleted = activeList.status === 'completed';
  const isCancelled = activeList.status === 'cancelled';
  const isReadOnly = isCompleted || isCancelled || historyView;
  const isHistoryView = isReadOnly || historyView;

  const getStatusLabel = () => {
    if (isCompleted) return "Concluída";
    if (isCancelled) return "Cancelada";
    return "Em andamento";
  };

  const handleShare = () => {
    if (!activeList) return;

    const listText = `Lista de Reposição: ${activeList.name}\n` +
      `Data: ${format(activeList.createdAt, 'dd/MM/yyyy HH:mm')}\n` +
      `Status: ${getStatusLabel()}\n\n` +
      `Itens:\n${activeList.items.map(item => 
        `- ${item.name}: ${item.quantity} unidades`).join('\n')}`;

    // Use Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: `Lista de Reposição: ${activeList.name}`,
        text: listText
      }).catch(err => {
        console.error('Erro ao compartilhar:', err);
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(listText);
        alert('Lista copiada para a área de transferência');
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(listText);
      alert('Lista copiada para a área de transferência');
    }
  };

  return (
    <Sheet 
      open={!!activeList} 
      onOpenChange={(open) => {
        // Only allow closing via the confirm/cancel buttons
        if (!open && !isReadOnly) {
          return;
        }
        if (!open) {
          onClose();
        }
      }}
    >
      <SheetContent className="w-full sm:max-w-md">
        <Card className={`w-full border-none shadow-none ${isHistoryView ? 'bg-amber-50' : ''}`}>
          <RestockListHeader 
            activeList={true} 
            startTime={activeList.createdAt} 
            historyView={isHistoryView} 
          />
          
          <CardContent className="space-y-4">
            <div className="pb-2 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isHistoryView && <FileText className="h-5 w-5 mr-2 text-amber-600" />}
                  <p className="font-medium">{activeList.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {activeList.status && (
                    <span className={`text-sm px-2 py-1 rounded ${
                      isCompleted ? 'bg-status-ok/10 text-status-ok' : 
                      isCancelled ? 'bg-status-danger/10 text-status-danger' : 
                      'bg-status-warning/10 text-status-warning'
                    }`}>
                      {getStatusLabel()}
                    </span>
                  )}
                  {isHistoryView && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0" 
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Criada em {format(activeList.createdAt, 'dd/MM/yyyy')} às {format(activeList.createdAt, 'HH:mm')}
              </p>
            </div>
            
            <div className={`space-y-3 max-h-[60vh] overflow-y-auto pr-2 ${isHistoryView ? 'font-mono text-sm' : ''}`}>
              {activeList.items.map((item) => {
                const product = products.find(p => p.id === item.productId);
                
                return (
                  <div 
                    key={item.productId} 
                    className={`flex items-center justify-between p-2 border rounded-md ${
                      isHistoryView ? 'border-amber-200 bg-amber-50/50' : ''
                    }`}
                  >
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
