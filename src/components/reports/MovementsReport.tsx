
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ReportOptions, ReportType } from '@/types';
import ReportCard from './ReportCard';

type MovementsReportProps = {
  reportOptions: ReportOptions;
  generating: boolean;
  onGenerateReport: () => void;
  onUpdateOptions: (options: Partial<ReportOptions>) => void;
};

const MovementsReport = ({
  reportOptions,
  generating,
  onGenerateReport,
  onUpdateOptions,
}: MovementsReportProps) => {
  return (
    <ReportCard
      title="Relatório de Movimentações"
      description="Exporte um relatório detalhado de todas as movimentações de produtos."
      onGenerateReport={onGenerateReport}
      generating={generating}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="period">Período</Label>
          <Select 
            defaultValue="daily" 
            onValueChange={(value) => 
              onUpdateOptions({ type: value as ReportType })
            }
          >
            <SelectTrigger id="period">
              <SelectValue placeholder="Escolha o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diário</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Data Inicial</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !reportOptions.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {reportOptions.startDate ? (
                  format(reportOptions.startDate, "dd/MM/yyyy")
                ) : (
                  <span>Escolha uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={reportOptions.startDate}
                onSelect={(date) => 
                  onUpdateOptions({ startDate: date })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
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

export default MovementsReport;
