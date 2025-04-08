
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportCard from './ReportCard';

type LowStockReportProps = {
  generating: boolean;
  onGenerateReport: () => void;
};

const LowStockReport = ({ generating, onGenerateReport }: LowStockReportProps) => {
  return (
    <ReportCard
      title="Relatório de Estoque Baixo"
      description="Exporte um relatório com produtos abaixo do estoque mínimo."
      onGenerateReport={onGenerateReport}
      generating={generating}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nível de Criticidade</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Nível de criticidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              <SelectItem value="critical">Crítico (0% - 30%)</SelectItem>
              <SelectItem value="warning">Alerta (31% - 60%)</SelectItem>
              <SelectItem value="attention">Atenção (61% - 90%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Formato</Label>
          <Select defaultValue="pdf">
            <SelectTrigger>
              <SelectValue placeholder="Formato do relatório" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </ReportCard>
  );
};

export default LowStockReport;
