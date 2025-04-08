
import { Product } from '../types';

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
