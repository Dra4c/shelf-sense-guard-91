
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ReportCard from './ReportCard';

type TopRestockedReportProps = {
  generating: boolean;
  onGenerateReport: () => void;
};

const TopRestockedReport = ({ generating, onGenerateReport }: TopRestockedReportProps) => {
  return (
    <ReportCard
      title="Relatório de Top Repostos"
      description="Exporte um relatório dos produtos mais repostos nas prateleiras."
      onGenerateReport={onGenerateReport}
      generating={generating}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Período</Label>
          <Select defaultValue="week">
            <SelectTrigger>
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mês</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
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

export default TopRestockedReport;
