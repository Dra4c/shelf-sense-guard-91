
export type ProductFormValues = {
  name: string;
  category: string;
  brand: string;
  barcode: string;
  minStock: number;
  image?: string;
  expiryDate?: Date;
  unit: 'unidade' | 'caixa' | 'fardo';
};
