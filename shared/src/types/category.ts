import type { Transaction } from './transaction.ts';

export interface Category {
  id: number;
  name: string;
  description?: string;
  transactions?: Transaction[];
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
}

