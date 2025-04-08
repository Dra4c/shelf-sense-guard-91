import { Product, Batch, Movement } from '../types';

// Helper function to add days to date
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Current date for reference
const now = new Date();

// Sample Products
export const products: Product[] = [
  {
    id: "1",
    name: "Leite Integral",
    category: "Laticínios",
    brand: "Fazenda Feliz",
    barcode: "7891234567890",
    minStock: 20,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80",
    currentStock: 18,
  },
  {
    id: "2",
    name: "Arroz Branco",
    category: "Grãos",
    brand: "Grão Dourado",
    barcode: "7891234567891",
    minStock: 15,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80",
    currentStock: 25,
  },
  {
    id: "3",
    name: "Feijão Preto",
    category: "Grãos",
    brand: "Grão Dourado",
    barcode: "7891234567892",
    minStock: 15,
    image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80", 
    currentStock: 5,
  },
  {
    id: "4",
    name: "Café em Pó",
    category: "Bebidas",
    brand: "Café Brasil",
    barcode: "7891234567893",
    minStock: 10,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80",
    currentStock: 8,
  },
  {
    id: "5",
    name: "Óleo de Soja",
    category: "Óleos",
    brand: "GotaDOuro",
    barcode: "7891234567894",
    minStock: 12,
    image: "https://images.unsplash.com/photo-1620574387735-3624a33a1ece?auto=format&fit=crop&q=80",
    currentStock: 22,
  },
];

// Sample Batches with various statuses
export const batches: Batch[] = [
  {
    id: "1",
    productId: "1",
    quantity: 10,
    expiryDate: addDays(now, 5), // Expiring soon
    entryDate: addDays(now, -25),
    location: "A1",
    status: "expiring",
  },
  {
    id: "2",
    productId: "1",
    quantity: 8,
    expiryDate: addDays(now, 45), // OK
    entryDate: addDays(now, -5),
    location: "A2",
    status: "ok",
  },
  {
    id: "3",
    productId: "2",
    quantity: 25,
    expiryDate: addDays(now, 180), // OK
    entryDate: addDays(now, -15),
    location: "B3",
    status: "ok",
  },
  {
    id: "4",
    productId: "3",
    quantity: 5,
    expiryDate: addDays(now, 90), // OK
    entryDate: addDays(now, -30),
    location: "B1",
    status: "ok",
  },
  {
    id: "5",
    productId: "4",
    quantity: 3,
    expiryDate: addDays(now, -5), // Expired
    entryDate: addDays(now, -45),
    location: "C2",
    status: "expired",
  },
  {
    id: "6",
    productId: "4",
    quantity: 5,
    expiryDate: addDays(now, 20), // OK
    entryDate: addDays(now, -10),
    location: "C3",
    status: "ok",
  },
  {
    id: "7",
    productId: "5",
    quantity: 22,
    expiryDate: addDays(now, 365), // OK
    entryDate: addDays(now, -7),
    location: "D1",
    status: "ok",
  },
];

// Sample Movements
export const movements: Movement[] = [
  {
    id: "1",
    productId: "1",
    batchId: "1",
    type: "entry",
    quantity: 10,
    date: addDays(now, -25),
    notes: "Entrega mensal",
  },
  {
    id: "2",
    productId: "1",
    batchId: "2",
    type: "entry",
    quantity: 8,
    date: addDays(now, -5),
    notes: "Entrega de emergência",
  },
  {
    id: "3",
    productId: "2",
    batchId: "3",
    type: "entry",
    quantity: 25,
    date: addDays(now, -15),
  },
  {
    id: "4",
    productId: "4",
    batchId: "5",
    type: "loss",
    quantity: 2,
    date: addDays(now, -2),
    notes: "Produto danificado",
  },
  {
    id: "5",
    productId: "3",
    batchId: "4",
    type: "exit",
    quantity: 10,
    date: addDays(now, -1),
    notes: "Reposição na prateleira",
  },
];

// Adicionar a função getMockMovements que estava faltando
export const getMockMovements = () => {
  return movements;
};

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
