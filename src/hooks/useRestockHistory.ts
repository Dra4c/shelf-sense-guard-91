import { useState } from 'react';

// Mock history data - we're keeping this in the hook for the refactor
const initialHistoryData = [
  {
    id: 'hist_1',
    name: 'Reposição Semanal',
    createdAt: new Date(2025, 3, 1, 10, 30),
    status: 'completed' as const,
    itemCount: 12,
    items: [
      { productId: 'prod_1', name: 'Produto 1', quantity: 5 },
      { productId: 'prod_2', name: 'Produto 2', quantity: 7 }
    ]
  },
  {
    id: 'hist_2',
    name: 'Reposição Prioridades',
    createdAt: new Date(2025, 3, 5, 9, 15),
    status: 'cancelled' as const,
    itemCount: 5,
    items: [
      { productId: 'prod_3', name: 'Produto 3', quantity: 2 },
      { productId: 'prod_4', name: 'Produto 4', quantity: 3 }
    ]
  },
  {
    id: 'hist_3',
    name: 'Reposição Emergencial',
    createdAt: new Date(2025, 3, 7, 14, 45),
    status: 'active' as const,
    itemCount: 3,
    items: [
      { productId: 'prod_5', name: 'Produto 5', quantity: 1 },
      { productId: 'prod_6', name: 'Produto 6', quantity: 2 }
    ]
  }
];

export function useRestockHistory() {
  const [historyList, setHistoryList] = useState<any[]>(initialHistoryData);

  const addToHistory = (item: any) => {
    setHistoryList(prev => [item, ...prev]);
  };

  const updateHistoryItem = (id: string, updates: Partial<any>) => {
    setHistoryList(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const removeFromHistory = (id: string) => {
    setHistoryList(prev => prev.filter(item => item.id !== id));
  };

  return {
    historyList,
    addToHistory,
    updateHistoryItem,
    removeFromHistory
  };
}
