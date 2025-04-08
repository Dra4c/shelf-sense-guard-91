
import { products } from './products';
import { batches } from './batches';

// Calculate statistics for dashboard
export const getStats = () => {
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.currentStock < p.minStock).length;
  
  const expiringBatches = batches.filter(b => b.status === "expiring").length;
  const expiredBatches = batches.filter(b => b.status === "expired").length;
  
  const totalStock = products.reduce((sum, product) => sum + product.currentStock, 0);
  
  return {
    totalProducts,
    lowStockProducts,
    expiringBatches,
    expiredBatches,
    totalStock
  };
};
