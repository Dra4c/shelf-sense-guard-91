
import React from 'react';
import { Button } from '@/components/ui/button';

interface BarcodeScannerProps {
  onStopScan: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onStopScan }) => {
  return (
    <div className="scanner-ui fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/70 animate-fade-in">
      <div className="scan-region relative p-6 border-2 border-primary rounded-lg mb-4 w-4/5 max-w-xs aspect-[4/3] animate-pulse-light">
        <div className="absolute inset-0 border-t-2 border-l-2 border-primary w-8 h-8 -m-1"></div>
        <div className="absolute top-0 right-0 border-t-2 border-r-2 border-primary w-8 h-8 -m-1"></div>
        <div className="absolute bottom-0 left-0 border-b-2 border-l-2 border-primary w-8 h-8 -m-1"></div>
        <div className="absolute bottom-0 right-0 border-b-2 border-r-2 border-primary w-8 h-8 -m-1"></div>
        
        <div className="h-0.5 bg-primary/80 w-full absolute top-1/2 left-0 animate-pulse"></div>
      </div>
      
      <p className="text-white text-center mb-8 text-sm animate-fade-in">
        Posicione o código de barras dentro da área
      </p>
      
      <Button 
        onClick={onStopScan}
        variant="outline"
        className="mt-4 fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm border-primary text-primary animate-scale-in"
      >
        Cancelar escaneamento
      </Button>
    </div>
  );
};

export default BarcodeScanner;
