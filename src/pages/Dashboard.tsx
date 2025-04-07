
import React from 'react';
import { 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  Boxes, 
  BarChart4
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AlertsCard from '@/components/dashboard/AlertsCard';
import LowStockCard from '@/components/dashboard/LowStockCard';
import { getStats } from '@/data/mockData';

const Dashboard = () => {
  const stats = getStats();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do estoque e alertas importantes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Produtos"
          value={stats.totalProducts}
          icon={<Package className="h-6 w-6" />}
        />
        <StatCard
          title="Produtos c/ Estoque Baixo"
          value={stats.lowStockProducts}
          icon={<AlertTriangle className="h-6 w-6" />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Lotes Vencendo"
          value={stats.expiringBatches}
          icon={<ShoppingCart className="h-6 w-6" />}
        />
        <StatCard
          title="Lotes Vencidos"
          value={stats.expiredBatches}
          icon={<Boxes className="h-6 w-6" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AlertsCard />
        <LowStockCard />
      </div>
    </div>
  );
};

export default Dashboard;
