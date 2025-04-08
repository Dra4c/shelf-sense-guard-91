
import { Batch } from '../types';
import { addDays, now } from './utils';

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
