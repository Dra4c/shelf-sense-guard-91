
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOffline } from '@/contexts/OfflineContext';
import { ReportCategory, ReportType, ReportOptions } from '@/types';
import { getReportCategoryLabel, getReportTypeLabel } from '@/components/reports/ReportUtils';

// Import the report components
import MovementsReport from '@/components/reports/MovementsReport';
import ExpiringReport from '@/components/reports/ExpiringReport';
import LowStockReport from '@/components/reports/LowStockReport';
import TopRestockedReport from '@/components/reports/TopRestockedReport';
import RecentReports from '@/components/reports/RecentReports';

const Reports = () => {
  const { isOffline, addPendingAction } = useOffline();
  const [generating, setGenerating] = useState(false);
  const [reportOptions, setReportOptions] = useState<ReportOptions>({
    type: 'daily',
    category: 'movements',
    startDate: new Date(),
  });

  const handleGenerateReport = async () => {
    setGenerating(true);
    
    try {
      // In offline mode, save the request for later sync
      if (isOffline) {
        addPendingAction({
          type: 'generateReport',
          data: reportOptions
        });
        
        toast.info('Relatório será gerado quando a conexão for restaurada', {
          description: 'Os dados estão salvos para sincronização posterior'
        });
        setGenerating(false);
        return;
      }
      
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Relatório gerado com sucesso!', {
        description: `${getReportCategoryLabel(reportOptions.category)} - ${getReportTypeLabel(reportOptions.type)}`
      });
      
      // Here we would typically handle the download or email process
      
    } catch (error) {
      toast.error('Erro ao gerar relatório', {
        description: 'Tente novamente mais tarde'
      });
    } finally {
      setGenerating(false);
    }
  };
  
  const handleUpdateOptions = (options: Partial<ReportOptions>) => {
    setReportOptions(prev => ({ ...prev, ...options }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">
          Gere e exporte relatórios detalhados para análise de estoque.
        </p>
      </div>

      <Tabs defaultValue="movements" className="space-y-4" onValueChange={(value) => 
        handleUpdateOptions({ category: value as ReportCategory })
      }>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
          <TabsTrigger value="expiring">Vencimentos</TabsTrigger>
          <TabsTrigger value="lowStock">Estoque Baixo</TabsTrigger>
          <TabsTrigger value="topRestocked">Top Repostos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="movements">
          <MovementsReport 
            reportOptions={reportOptions}
            generating={generating}
            onGenerateReport={handleGenerateReport}
            onUpdateOptions={handleUpdateOptions}
          />
        </TabsContent>
        
        <TabsContent value="expiring">
          <ExpiringReport 
            generating={generating}
            onGenerateReport={handleGenerateReport}
          />
        </TabsContent>
        
        <TabsContent value="lowStock">
          <LowStockReport 
            generating={generating}
            onGenerateReport={handleGenerateReport}
          />
        </TabsContent>
        
        <TabsContent value="topRestocked">
          <TopRestockedReport 
            generating={generating}
            onGenerateReport={handleGenerateReport}
          />
        </TabsContent>
      </Tabs>
      
      <RecentReports />
    </div>
  );
};

export default Reports;
