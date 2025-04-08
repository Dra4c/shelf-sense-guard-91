
import { ReportCategory, ReportType } from '@/types';

export const getReportTypeLabel = (type: ReportType) => {
  switch (type) {
    case 'daily': return 'Diário';
    case 'weekly': return 'Semanal';
    case 'monthly': return 'Mensal';
  }
};

export const getReportCategoryLabel = (category: ReportCategory) => {
  switch (category) {
    case 'movements': return 'Movimentações';
    case 'expiring': return 'Produtos Vencendo';
    case 'lowStock': return 'Estoque Baixo';
    case 'topRestocked': return 'Top Repostos';
  }
};
