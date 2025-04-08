
import React from 'react';
import { ShoppingCart, Clock } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';

interface RestockListHeaderProps {
  activeList?: boolean;
  startTime?: Date;
}

const RestockListHeader: React.FC<RestockListHeaderProps> = ({ activeList, startTime }) => {
  const [elapsedTime, setElapsedTime] = React.useState<string>('');

  React.useEffect(() => {
    if (!activeList || !startTime) return;

    const calculateElapsedTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - startTime.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffSecs = Math.floor((diffMs % 60000) / 1000);
      setElapsedTime(`${diffMins}:${diffSecs < 10 ? '0' : ''}${diffSecs}`);
    };

    calculateElapsedTime();
    const interval = setInterval(calculateElapsedTime, 1000);
    
    return () => clearInterval(interval);
  }, [activeList, startTime]);

  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5" />
        <span>{activeList ? 'Lista de Reposição Ativa' : 'Criar Lista de Reposição'}</span>
        {activeList && startTime && (
          <div className="ml-auto flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{elapsedTime}</span>
          </div>
        )}
      </CardTitle>
    </CardHeader>
  );
};

export default RestockListHeader;
