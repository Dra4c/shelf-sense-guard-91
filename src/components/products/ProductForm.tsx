
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Barcode, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

type ProductFormValues = {
  name: string;
  category: string;
  brand: string;
  barcode: string;
  minStock: number;
  image?: string;
};

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  initialData?: Partial<ProductFormValues>;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      brand: initialData?.brand || '',
      barcode: initialData?.barcode || '',
      minStock: initialData?.minStock || 10,
      image: initialData?.image || '',
    },
  });
  
  // Update form when initialData changes (e.g., when barcode is scanned)
  useEffect(() => {
    if (initialData?.barcode) {
      form.setValue('barcode', initialData.barcode);
    }
  }, [initialData, form]);

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input placeholder="Nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Categoria" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Marca" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
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
        
        <FormField
          control={form.control}
          name="minStock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque mínimo</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Estoque mínimo" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da imagem</FormLabel>
              <FormControl>
                <Input placeholder="URL da imagem (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Salvar produto
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
