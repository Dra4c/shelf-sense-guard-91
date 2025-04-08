
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  FilePdf, 
  Mail, 
  Download, 
  Calendar as CalendarIcon,
  Plus,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useOffline } from '@/contexts/OfflineContext';
import { ReportCategory, ReportType, ReportOptions } from '@/types';

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
  
  const getReportTypeLabel = (type: ReportType) => {
    switch (type) {
      case 'daily': return 'Diário';
      case 'weekly': return 'Semanal';
      case 'monthly': return 'Mensal';
    }
  };
  
  const getReportCategoryLabel = (category: ReportCategory) => {
    switch (category) {
      case 'movements': return 'Movimentações';
      case 'expiring': return 'Produtos Vencendo';
      case 'lowStock': return 'Estoque Baixo';
      case 'topRestocked': return 'Top Repostos';
    }
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
        setReportOptions(prev => ({ ...prev, category: value as ReportCategory }))
      }>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="movements">Movimentações</TabsTrigger>
          <TabsTrigger value="expiring">Vencimentos</TabsTrigger>
          <TabsTrigger value="lowStock">Estoque Baixo</TabsTrigger>
          <TabsTrigger value="topRestocked">Top Repostos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="movements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Movimentações</CardTitle>
              <CardDescription>
                Exporte um relatório detalhado de todas as movimentações de produtos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Select 
                    defaultValue="daily" 
                    onValueChange={(value) => 
                      setReportOptions(prev => ({ ...prev, type: value as ReportType }))
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
                          setReportOptions(prev => ({ ...prev, startDate: date }))
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
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Última geração: Nunca
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleGenerateReport} disabled={generating || (!reportOptions.startDate)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button onClick={handleGenerateReport} disabled={generating || (!reportOptions.startDate)}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Relatório
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Produtos Vencendo</CardTitle>
              <CardDescription>
                Exporte um relatório com produtos próximos da data de validade.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Última geração: Nunca
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleGenerateReport} disabled={generating}>
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button onClick={handleGenerateReport} disabled={generating}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Relatório
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="lowStock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Estoque Baixo</CardTitle>
              <CardDescription>
                Exporte um relatório com produtos abaixo do estoque mínimo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Última geração: Nunca
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleGenerateReport} disabled={generating}>
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button onClick={handleGenerateReport} disabled={generating}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Relatório
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="topRestocked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Top Repostos</CardTitle>
              <CardDescription>
                Exporte um relatório dos produtos mais repostos nas prateleiras.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Última geração: Nunca
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleGenerateReport} disabled={generating}>
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar por Email
                </Button>
                <Button onClick={handleGenerateReport} disabled={generating}>
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Relatório
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FilePdf className="h-5 w-5 mr-2" />
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
    </div>
  );
};

export default Reports;
