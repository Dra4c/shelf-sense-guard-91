
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const RecentReports = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          <span>Relatórios Recentes</span>
        </CardTitle>
        <CardDescription>
          Acesse seus relatórios gerados recentemente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border p-4 flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-10 w-10 text-blue-500 mr-3" />
              <div>
                <h3 className="font-medium">Relatório de Movimentações - Diário</h3>
                <p className="text-sm text-muted-foreground">Gerado em 08/04/2025 às 10:32</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="rounded-md border p-4 flex justify-between items-center">
            <div className="flex items-center">
              <FileText className="h-10 w-10 text-red-500 mr-3" />
              <div>
                <h3 className="font-medium">Relatório de Produtos Vencendo - 30 dias</h3>
                <p className="text-sm text-muted-foreground">Gerado em 07/04/2025 às 15:18</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReports;
