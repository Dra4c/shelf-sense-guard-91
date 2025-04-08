
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';

const RestockListHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <ShoppingCart className="h-5 w-5" />
        <span>Criar Lista de Reposição</span>
      </CardTitle>
    </CardHeader>
  );
};

export default RestockListHeader;
