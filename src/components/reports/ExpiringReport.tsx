
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportCard from './ReportCard';

type ExpiringReportProps = {
  generating: boolean;
  onGenerateReport: () => void;
};

const ExpiringReport = ({ generating, onGenerateReport }: ExpiringReportProps) => {
  return (
    <ReportCard
      title="Relatório de Produtos Vencendo"
      description="Exporte um relatório com produtos próximos da data de validade."
      onGenerateReport={onGenerateReport}
      generating={generating}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Intervalo de Tempo</Label>
          <Select defaultValue="30days">
            <SelectTrigger>
              <SelectValue placeholder="Intervalo de tempo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Próximos 7 dias</SelectItem>
              <SelectItem value="15days">Próximos 15 dias</SelectItem>
              <SelectItem value="30days">Próximos 30 dias</SelectItem>
              <SelectItem value="90days">Próximos 90 dias</SelectItem>
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

export default ExpiringReport;
