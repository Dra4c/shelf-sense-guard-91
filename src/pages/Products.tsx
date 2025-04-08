import React, { useState } from 'react';
import { Plus, Search, Filter, Barcode, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/products/ProductCard';
import { products as initialProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import AddProductDialog from '@/components/products/AddProductDialog';
import { Product } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(initialProducts.map(p => ({
    ...p,
    unit: p.unit || 'unidade' // Fornecer valor padrão para produtos existentes
  })));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm)
  );

  const handleAddProduct = () => {
    setIsAddDialogOpen(true);
  };

  const startScan = async () => {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      
      if (status.granted) {
        document.querySelector('body')?.classList.add('scanner-active');
        setIsScanning(true);
        await BarcodeScanner.hideBackground();
        const result = await BarcodeScanner.startScan();
        
        if (result.hasContent) {
          const scannedBarcode = result.content;
          
          document.querySelector('body')?.classList.remove('scanner-active');
          setIsScanning(false);
          await BarcodeScanner.showBackground();
          await BarcodeScanner.stopScan();
          
          toast({
            title: "Código de barras detectado",
            description: `Código ${scannedBarcode} identificado. Complete os dados do produto.`,
          });
          
          setIsAddDialogOpen(true);
          
          return scannedBarcode;
        }
      } else {
        toast({
          title: "Permissão negada",
          description: "Você precisa permitir o acesso à câmera para usar o scanner.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Scanning error:', error);
      
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

  const handleBarcodeScan = () => {
    startScan();
  };

  const handleProductAdded = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    toast({
      title: "Produto adicionado",
      description: `${newProduct.name} foi adicionado com sucesso.`,
    });
  };

  if (isScanning) {
    return (
      <div className="scanner-ui fixed inset-0 flex flex-col items-center justify-center z-50">
        <div className="scan-region p-4 border-2 border-primary rounded-lg mb-4">
          <p className="text-white text-center">Posicione o código de barras aqui</p>
        </div>
        <Button 
          onClick={stopScan}
          variant="destructive"
          className="mt-4 fixed bottom-16 left-1/2 transform -translate-x-1/2"
        >
          Cancelar escaneamento
        </Button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-4 pb-16 animate-fade-in">
        <div className="flex items-center justify-between sticky top-0 z-10 bg-background py-2">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Produtos</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seu catálogo
            </p>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Novo
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 pt-0">
                <Tabs defaultValue="manual" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="manual">Cadastro Manual</TabsTrigger>
                    <TabsTrigger value="barcode">Código de Barras</TabsTrigger>
                  </TabsList>
                  <TabsContent value="manual">
                    <div className="text-center p-4">
                      <h3 className="font-medium">Cadastro Manual</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Preencha os dados do produto manualmente
                      </p>
                      <Button 
                        onClick={handleAddProduct} 
                        className="mt-4"
                        variant="outline"
                      >
                        Abrir formulário
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="barcode">
                    <div className="text-center p-4">
                      <h3 className="font-medium">Escanear Código</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Use a câmera para ler o código de barras
                      </p>
                      <Button 
                        onClick={handleBarcodeScan} 
                        className="mt-4"
                      >
                        Ativar Scanner
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome ou código..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum produto encontrado.</p>
          </div>
        )}
        
        <AddProductDialog 
          open={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen}
          onProductAdded={handleProductAdded}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie o catálogo de produtos do seu estabelecimento.
          </p>
        </div>
        <Button onClick={handleAddProduct} className="gap-1">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome ou código de barras..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => toast({ title: "Filtros", description: "Funcionalidade em desenvolvimento." })}>
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleBarcodeScan}>
            <Barcode className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum produto encontrado.</p>
        </div>
      )}
      
      <AddProductDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default Products;
