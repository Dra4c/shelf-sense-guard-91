
import React, { useState } from 'react';
import { Save, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import ConfirmationDialog from '@/components/ui/confirmation-dialog';

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
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  
  return (
    <CardFooter className="justify-between border-t pt-4">
      <div className="text-sm">
        {selectedProductsCount} produtos selecionados
      </div>
      
      {activeList ? (
        <div className="flex gap-2">
          <Button variant="destructive" onClick={() => setShowCancelConfirm(true)}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button variant="default" onClick={() => setShowSaveConfirm(true)}>
            <Check className="h-4 w-4 mr-2" />
            Confirmar Reposição
          </Button>
          
          <ConfirmationDialog
            open={showCancelConfirm}
            onOpenChange={setShowCancelConfirm}
            title="Cancelar Reposição"
            description="Tem certeza que deseja cancelar esta lista de reposição? Esta ação não poderá ser desfeita."
            onConfirm={() => {
              setShowCancelConfirm(false);
              if (onCancel) onCancel();
            }}
            variant="destructive"
          />
          
          <ConfirmationDialog
            open={showSaveConfirm}
            onOpenChange={setShowSaveConfirm}
            title="Confirmar Reposição"
            description="Confirmar que todos os itens foram repostos nas prateleiras?"
            onConfirm={() => {
              setShowSaveConfirm(false);
              if (onConfirm) onConfirm();
            }}
          />
        </div>
      ) : (
        <>
          <Button onClick={() => {
            if (selectedProductsCount > 0) {
              setShowSaveConfirm(true);
            } else {
              // No confirmation needed if no products selected
              onSave();
            }
          }}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Lista
          </Button>
          
          <ConfirmationDialog
            open={showSaveConfirm}
            onOpenChange={setShowSaveConfirm}
            title="Salvar Lista de Reposição"
            description={`Confirmar criação da lista com ${selectedProductsCount} produtos?`}
            onConfirm={() => {
              setShowSaveConfirm(false);
              onSave();
            }}
          />
        </>
      )}
    </CardFooter>
  );
};

export default RestockListFooter;
