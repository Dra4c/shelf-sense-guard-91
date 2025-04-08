
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Batches from "./pages/Batches";
import Restock from "./pages/Restock";
import Movements from "./pages/Movements";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { OfflineProvider } from "./contexts/OfflineContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <OfflineProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/lotes" element={<Batches />} />
              <Route path="/reposicao" element={<Restock />} />
              <Route path="/movimentacoes" element={<Movements />} />
              <Route path="/relatorios" element={<Reports />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </OfflineProvider>
  </QueryClientProvider>
);

export default App;
