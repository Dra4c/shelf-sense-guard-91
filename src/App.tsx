
import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OfflineProvider } from "./contexts/OfflineContext";
import AppLayout from "./components/layout/AppLayout";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load all pages to improve initial load time
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Products = lazy(() => import("./pages/Products"));
const Batches = lazy(() => import("./pages/Batches"));
const Restock = lazy(() => import("./pages/Restock"));
const Movements = lazy(() => import("./pages/Movements"));
const Reports = lazy(() => import("./pages/Reports"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen w-screen">
    <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
  </div>
);

// Configure React Query with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (replaced cacheTime)
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <OfflineProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Dashboard />
                    </Suspense>
                  }
                />
                <Route
                  path="/produtos"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Products />
                    </Suspense>
                  }
                />
                <Route
                  path="/lotes"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Batches />
                    </Suspense>
                  }
                />
                <Route
                  path="/reposicao"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Restock />
                    </Suspense>
                  }
                />
                <Route
                  path="/movimentacoes"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Movements />
                    </Suspense>
                  }
                />
                <Route
                  path="/relatorios"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <Reports />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="*"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <NotFound />
                  </Suspense>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </OfflineProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
