
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">Página não encontrada</p>
      <Button onClick={() => navigate('/')}>Voltar para o Dashboard</Button>
    </div>
  );
};

export default NotFound;
