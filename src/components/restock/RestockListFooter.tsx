
import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface RestockListFooterProps {
  selectedProductsCount: number;
  onSave: () => void;
}

const RestockListFooter: React.FC<RestockListFooterProps> = ({ selectedProductsCount, onSave }) => {
  return (
    <CardFooter className="justify-between border-t pt-4">
      <div className="text-sm">
        {selectedProductsCount} produtos selecionados
      </div>
      <Button onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Salvar Lista
      </Button>
    </CardFooter>
  );
};

export default RestockListFooter;
