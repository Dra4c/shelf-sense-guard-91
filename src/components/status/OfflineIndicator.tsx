
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WifiOff, UploadCloud } from 'lucide-react';
import { useOffline } from '@/contexts/OfflineContext';

export const OfflineIndicator = () => {
  const { isOffline, pendingSync, syncData } = useOffline();
  
  if (!isOffline && pendingSync === 0) return null;
  
  return (
    <div className="flex items-center gap-2">
      {isOffline && (
        <Badge variant="destructive" className="flex items-center">
          <WifiOff className="h-3 w-3 mr-1" />
          Offline
        </Badge>
      )}
      
      {pendingSync > 0 && (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center text-xs" 
          onClick={syncData}
          disabled={isOffline}
        >
          <UploadCloud className="h-3 w-3 mr-1" />
          Sincronizar ({pendingSync})
        </Button>
      )}
    </div>
  );
};

export default OfflineIndicator;
