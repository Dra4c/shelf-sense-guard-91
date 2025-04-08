
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Clock } from 'lucide-react';

type ReportCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  onGenerateReport: () => void;
  generating: boolean;
  lastGenerated?: string;
};

const ReportCard = ({
  title,
  description,
  children,
  onGenerateReport,
  generating,
  lastGenerated = 'Nunca',
}: ReportCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      <CardFooter className="justify-between">
        <div className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Última geração: {lastGenerated}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onGenerateReport} disabled={generating}>
            <Mail className="h-4 w-4 mr-2" />
            Enviar por Email
          </Button>
          <Button onClick={onGenerateReport} disabled={generating}>
            <Download className="h-4 w-4 mr-2" />
            Baixar Relatório
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportCard;
