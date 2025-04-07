// Product data types
export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  barcode: string;
  minStock: number;
  image?: string;
  currentStock: number;
  expiryDate?: Date;
};

// Batch data types
export type Batch = {
  id: string;
  productId: string;
  quantity: number;
  expiryDate: Date;
  entryDate: Date;
  location: string;
  status: 'ok' | 'expiring' | 'expired';
};

// Movement types
export type MovementType = 'entry' | 'exit' | 'loss' | 'restock';

export type Movement = {
  id: string;
  productId: string;
  batchId?: string;
  type: MovementType;
  quantity: number;
  date: Date;
  notes?: string;
};

// User roles
export type UserRole = 'manager' | 'stocker' | 'replenisher';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
