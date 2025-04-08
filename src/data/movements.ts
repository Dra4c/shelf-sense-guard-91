
import { Movement } from '../types';
import { addDays, now } from './utils';

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

// Função para retornar o array de movimentos
export const getMockMovements = () => {
  return movements;
};
