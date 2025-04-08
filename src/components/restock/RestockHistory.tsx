
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RestockHistoryItem {
  id: string;
  name: string;
  createdAt: Date;
  status: 'completed' | 'cancelled' | 'active';
  itemCount?: number; // Make itemCount optional to match ActiveRestockList
}

interface RestockHistoryProps {
  history: RestockHistoryItem[];
  onViewList: (listId: string, historyView?: boolean) => void;
}

const RestockHistory: React.FC<RestockHistoryProps> = ({ history, onViewList }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center text-status-ok">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Concluída</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center text-status-danger">
            <XCircle className="h-4 w-4 mr-1" />
            <span>Cancelada</span>
          </div>
        );
      case 'active':
        return (
          <div className="flex items-center text-status-warning">
            <Clock className="h-4 w-4 mr-1" />
            <span>Em andamento</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <History className="h-5 w-5 mr-2" />
          Histórico de Reposição
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {history.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            <p>Nenhuma lista de reposição foi criada ainda.</p>
          </div>
        ) : (
          <div className="divide-y">
            {history.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <span>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</span>
                    <span>{item.itemCount} itens</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {getStatusBadge(item.status)}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewList(item.id, true)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RestockHistory;
