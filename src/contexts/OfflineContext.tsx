
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { WifiOff, Wifi } from 'lucide-react';

type OfflineContextType = {
  isOffline: boolean;
  pendingSync: number;
  syncData: () => Promise<void>;
  addPendingAction: (action: any) => void;
};

const OfflineContext = createContext<OfflineContextType | null>(null);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingSync, setPendingSync] = useState<number>(0);
  const [pendingActions, setPendingActions] = useState<any[]>([]);

  // Monitor connection status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast('Conexão restaurada', {
        icon: <Wifi className="h-4 w-4 text-green-500" />,
      });
      
      // Auto-sync when connection is restored
      if (pendingActions.length > 0) {
        syncData();
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast('Modo offline ativado', {
        icon: <WifiOff className="h-4 w-4 text-red-500" />,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check initial status
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingActions]);

  const addPendingAction = (action: any) => {
    setPendingActions(prev => [...prev, { ...action, timestamp: new Date() }]);
    setPendingSync(prev => prev + 1);
  };

  const syncData = async () => {
    if (pendingActions.length === 0) return;
    
    try {
      // Mock api call for sync
      // In a real app, this would make API calls to Supabase
      toast('Sincronizando dados...', {
        duration: 3000,
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear pending actions after successful sync
      setPendingActions([]);
      setPendingSync(0);
      
      toast.success('Dados sincronizados com sucesso', {
        description: `${pendingActions.length} operações sincronizadas`
      });
    } catch (error) {
      toast.error('Erro ao sincronizar dados', {
        description: 'Tente novamente mais tarde'
      });
    }
  };

  return (
    <OfflineContext.Provider value={{ isOffline, pendingSync, syncData, addPendingAction }}>
      {children}
    </OfflineContext.Provider>
  );
};
