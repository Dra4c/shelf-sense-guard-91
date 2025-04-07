
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductForm from './ProductForm';
import { PenLine, Barcode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: (product: Product) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ 
  open, 
  onOpenChange,
  onProductAdded 
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("manual");

  const handleSubmit = (data: Omit<Product, 'id' | 'currentStock'>) => {
    // Create a new product with the submitted data
    const newProduct: Product = {
      ...data,
      id: 'prod_' + Math.random().toString(36).substring(2, 9),
      currentStock: 0
    };

    // Call the callback function to add the product
    onProductAdded(newProduct);

    // Show success toast
    toast({
      title: "Produto adicionado",
      description: `${newProduct.name} foi adicionado ao catálogo.`,
    });

    // Close the dialog
    onOpenChange(false);
  };

  const handleScanBarcode = () => {
    toast({
      title: "Scanner de código de barras",
      description: "Posicione a câmera para ler o código de barras.",
    });
    
    // Simulate finding a product by barcode after 2 seconds
    setTimeout(() => {
      const mockBarcode = '789' + Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
      
      // Switch to manual tab with pre-filled data
      setActiveTab("manual");
      
      // Show toast about found barcode
      toast({
        title: "Código de barras detectado",
        description: `Código ${mockBarcode} identificado. Complete os dados do produto.`,
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
          <DialogDescription>
            Adicione um produto ao catálogo manualmente ou escaneie o código de barras.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" />
              Cadastro manual
            </TabsTrigger>
            <TabsTrigger value="barcode" className="flex items-center gap-2">
              <Barcode className="h-4 w-4" />
              Ler código de barras
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="mt-2">
            <ProductForm 
              onSubmit={handleSubmit}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>
          
          <TabsContent value="barcode" className="mt-2">
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="bg-gray-100 w-full aspect-video rounded-lg flex items-center justify-center">
                <Barcode className="h-16 w-16 text-gray-400" />
              </div>
              
              <p className="text-center text-muted-foreground">
                Posicione o código de barras do produto em frente à câmera para escaneá-lo automaticamente.
              </p>
              
              <button
                onClick={handleScanBarcode}
                className="flex items-center gap-2 bg-primary px-4 py-2 rounded-md text-white font-medium"
              >
                <Barcode className="h-4 w-4" />
                Simular leitura de código
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
