
import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle, 
  ShoppingCart, 
  Boxes, 
  BarChart4,
  ArrowDownUp,
  Calendar,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StatCard from '@/components/dashboard/StatCard';
import AlertsCard from '@/components/dashboard/AlertsCard';
import LowStockCard from '@/components/dashboard/LowStockCard';
import TopRestockedCard from '@/components/dashboard/TopRestockedCard';
import { OfflineIndicator } from '@/components/status/OfflineIndicator';
import { getStats } from '@/data/stats';

const Dashboard = () => {
  const stats = getStats();
  const [timeframe, setTimeframe] = useState('week');

  // Mock data for "Produtos Mais Vendidos" chart
  const topSellingData = [
    { name: "Arroz 5kg", count: 28, valor: 280 },
    { name: "Café 500g", count: 24, valor: 240 },
    { name: "Feijão 1kg", count: 18, valor: 180 },
    { name: "Açúcar 2kg", count: 15, valor: 150 },
    { name: "Leite 1L", count: 12, valor: 120 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral do estoque e alertas importantes.
          </p>
        </div>
        <OfflineIndicator />
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-base">
                <div className="flex items-center">
                  <ArrowDownUp className="h-5 w-5 mr-2 text-purple-500" />
                  Produtos Mais Vendidos
                </div>
              </CardTitle>
              <CardDescription>
                Produtos com maior volume de vendas
              </CardDescription>
            </div>
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mês</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSellingData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip formatter={(value) => [`${value} vendidos`, 'Quantidade']} />
                  <Bar 
                    dataKey="count" 
                    name="Vendidos" 
                    fill="#8884d8" 
                    radius={[0, 4, 4, 0]} 
                    barSize={20}
                    label={{ position: 'right', fontSize: 12 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <TopRestockedCard />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AlertsCard />
        <LowStockCard />
      </div>
    </div>
  );
};

export default Dashboard;
