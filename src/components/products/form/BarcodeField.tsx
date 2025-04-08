
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Barcode } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormValues } from './types';
import { useToast } from '@/hooks/use-toast';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

interface BarcodeFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

const BarcodeField: React.FC<BarcodeFieldProps> = ({ form }) => {
  const { toast } = useToast();

  const handleScanBarcode = async () => {
    try {
      // Check camera permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      
      if (status.granted) {
        // Make background transparent
        document.querySelector('body')?.classList.add('scanner-active');
        
        toast({
          title: "Scanner de código de barras",
          description: "Posicione o código de barras em frente à câmera.",
        });
        
        // Start scanning
        await BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();
        
        // Restore background
        document.querySelector('body')?.classList.remove('scanner-active');
        await BarcodeScanner.showBackground();
        
        // If we got a barcode
        if (result.hasContent) {
          form.setValue('barcode', result.content);
          toast({
            title: "Código de barras lido",
            description: `Código ${result.content} detectado com sucesso.`,
          });
        }
      } else {
        toast({
          title: "Permissão negada",
          description: "Você precisa permitir o acesso à câmera para usar o scanner.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Barcode scanning error:', error);
      
      // Clean up if there's an error
      document.querySelector('body')?.classList.remove('scanner-active');
      await BarcodeScanner.showBackground();
      await BarcodeScanner.stopScan();
      
      toast({
        title: "Erro no scanner",
        description: "Ocorreu um erro ao tentar escanear. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <FormField
      control={form.control}
      name="barcode"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Código de barras</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input placeholder="Código de barras" {...field} />
            </FormControl>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={handleScanBarcode}
            >
              <Barcode className="h-4 w-4" />
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BarcodeField;
