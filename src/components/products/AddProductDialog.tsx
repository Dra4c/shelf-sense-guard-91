
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductForm from './ProductForm';
import { PenLine, Barcode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Button } from '@/components/ui/button';

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
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  // Clean up scanner when dialog closes
  useEffect(() => {
    if (!open && isScanning) {
      stopScan();
    }
  }, [open]);

  const handleSubmit = (data: Omit<Product, 'id' | 'currentStock'>) => {
    // Create a new product with the submitted data
    const newProduct: Product = {
      ...data,
      id: 'prod_' + Math.random().toString(36).substring(2, 9),
      currentStock: 0
    };

    // Call the callback function to add the product
    onProductAdded(newProduct);

    // Close the dialog
    onOpenChange(false);
  };

  const startScan = async () => {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      
      if (status.granted) {
        setIsScanning(true);
        
        // Make background transparent
        document.querySelector('body')?.classList.add('scanner-active');
        await BarcodeScanner.hideBackground();
        
        const result = await BarcodeScanner.startScan();
        
        if (result.hasContent) {
          setScannedBarcode(result.content);
          setActiveTab("manual");
          
          toast({
            title: "Código de barras detectado",
            description: `Código ${result.content} identificado. Complete os dados do produto.`,
          });
        }
        
        // Restore normal state
        document.querySelector('body')?.classList.remove('scanner-active');
        setIsScanning(false);
        await BarcodeScanner.showBackground();
        await BarcodeScanner.stopScan();
      } else {
        toast({
          title: "Permissão negada",
          description: "Você precisa permitir o acesso à câmera para usar o scanner.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Scanning error:', error);
      
      // Clean up if there's an error
      document.querySelector('body')?.classList.remove('scanner-active');
      setIsScanning(false);
      await BarcodeScanner.showBackground();
      await BarcodeScanner.stopScan();
      
      toast({
        title: "Erro no scanner",
        description: "Ocorreu um erro ao tentar escanear. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  const stopScan = async () => {
    document.querySelector('body')?.classList.remove('scanner-active');
    setIsScanning(false);
    await BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
  };

  const handleScanBarcode = () => {
    startScan();
  };

  // Show scanner UI if scanning
  if (isScanning) {
    return (
      <Dialog open={open} onOpenChange={(newOpen) => {
        if (!newOpen) stopScan();
        onOpenChange(newOpen);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="scanner-ui flex flex-col items-center justify-center">
            <div className="scan-region p-8 border-2 border-primary rounded-lg mb-4">
              <p className="text-center">Posicione o código de barras aqui</p>
            </div>
            <Button 
              onClick={stopScan}
              variant="destructive"
              className="mt-4"
            >
              Cancelar escaneamento
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

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
              initialData={scannedBarcode ? { barcode: scannedBarcode } : undefined}
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
                Ativar scanner de código
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
