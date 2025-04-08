
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

interface AddProductDrawerProps {
  children: React.ReactNode;
  onManualAdd: () => void;
  onBarcodeScan: () => void;
}

const AddProductDrawer: React.FC<AddProductDrawerProps> = ({ children, onManualAdd, onBarcodeScan }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
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
                  onClick={onManualAdd} 
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
                  onClick={onBarcodeScan} 
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
  );
};

export default AddProductDrawer;
