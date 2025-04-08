
import React from 'react';
import { Filter, Barcode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProductActionsProps {
  onBarcodeScan: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ onBarcodeScan }) => {
  const { toast } = useToast();

  const handleFilterClick = () => {
    toast({
      title: "Filtros",
      description: "Funcionalidade em desenvolvimento."
    });
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={handleFilterClick}>
        <Filter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={onBarcodeScan}>
        <Barcode className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductActions;
