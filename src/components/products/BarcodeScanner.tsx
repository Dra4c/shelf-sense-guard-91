
import React from 'react';
import { Button } from '@/components/ui/button';

interface BarcodeScannerProps {
  onStopScan: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onStopScan }) => {
  return (
    <div className="scanner-ui fixed inset-0 flex flex-col items-center justify-center z-50">
      <div className="scan-region p-4 border-2 border-primary rounded-lg mb-4">
        <p className="text-white text-center">Posicione o código de barras aqui</p>
      </div>
      <Button 
        onClick={onStopScan}
        variant="destructive"
        className="mt-4 fixed bottom-16 left-1/2 transform -translate-x-1/2"
      >
        Cancelar escaneamento
      </Button>
    </div>
  );
};

export default BarcodeScanner;
