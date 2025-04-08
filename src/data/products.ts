
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: "prod_1",
    name: "Arroz Integral",
    category: "Alimentos",
    brand: "Tio João",
    barcode: "7898357410015",
    minStock: 10,
    currentStock: 5,
    expiryDate: new Date(2024, 9, 15),
    unit: "unidade"
  },
  {
    id: "prod_2",
    name: "Feijão Carioca",
    category: "Alimentos",
    brand: "Camil",
    barcode: "7898357410022",
    minStock: 15,
    currentStock: 8,
    expiryDate: new Date(2024, 8, 20),
    unit: "fardo"
  },
  {
    id: "prod_3",
    name: "Macarrão Espaguete",
    category: "Alimentos",
    brand: "Barilla",
    barcode: "7898357410039",
    minStock: 20,
    currentStock: 25,
    expiryDate: new Date(2024, 11, 10),
    unit: "caixa"
  },
  {
    id: "prod_4",
    name: "Azeite Extra Virgem",
    category: "Alimentos",
    brand: "Gallo",
    barcode: "7898357410046",
    minStock: 8,
    currentStock: 3,
    expiryDate: new Date(2024, 12, 5),
    unit: "unidade"
  },
  {
    id: "prod_5",
    name: "Leite Integral",
    category: "Laticínios",
    brand: "Itambé",
    barcode: "7898357410053",
    minStock: 30,
    currentStock: 12,
    expiryDate: new Date(2024, 6, 25),
    unit: "caixa"
  },
  {
    id: "prod_6",
    name: "Café em Pó",
    category: "Bebidas",
    brand: "Pilão",
    barcode: "7898357410060",
    minStock: 12,
    currentStock: 14,
    expiryDate: new Date(2024, 10, 18),
    unit: "unidade"
  }
];
