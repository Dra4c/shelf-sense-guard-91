
import React from 'react';
import { Save, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface RestockListFooterProps {
  selectedProductsCount: number;
  onSave: () => void;
  activeList?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const RestockListFooter: React.FC<RestockListFooterProps> = ({ 
  selectedProductsCount, 
  onSave, 
  activeList,
  onConfirm,
  onCancel
}) => {
  return (
    <CardFooter className="justify-between border-t pt-4">
      <div className="text-sm">
        {selectedProductsCount} produtos selecionados
      </div>
      
      {activeList ? (
        <div className="flex gap-2">
          <Button variant="destructive" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button variant="default" onClick={onConfirm}>
            <Check className="h-4 w-4 mr-2" />
            Confirmar Reposição
          </Button>
        </div>
      ) : (
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Lista
        </Button>
      )}
    </CardFooter>
  );
};

export default RestockListFooter;
