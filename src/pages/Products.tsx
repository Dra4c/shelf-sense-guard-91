
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products as initialProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import AddProductDialog from '@/components/products/AddProductDialog';
import { Product } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductSearch from '@/components/products/ProductSearch';
import ProductGrid from '@/components/products/ProductGrid';
import ProductActions from '@/components/products/ProductActions';
import BarcodeScanner from '@/components/products/BarcodeScanner';
import AddProductDrawer from '@/components/products/AddProductDrawer';

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
    return <BarcodeScanner onStopScan={stopScan} />;
  }

  if (isMobile) {
    return (
      <div className="space-y-4 pb-16 animate-fade-in">
        <ProductsHeader onAddProduct={handleAddProduct} isMobile={true} />
        <ProductSearch 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
        <ProductGrid 
          products={filteredProducts} 
          isMobile={true} 
        />
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
      <ProductsHeader onAddProduct={handleAddProduct} isMobile={false} />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <ProductSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
        </div>
        <ProductActions onBarcodeScan={handleBarcodeScan} />
      </div>
      
      <ProductGrid 
        products={filteredProducts} 
        isMobile={false} 
      />
      
      <AddProductDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default Products;
