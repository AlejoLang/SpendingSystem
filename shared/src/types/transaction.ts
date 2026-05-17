import type { Category, CreateCategoryDTO } from './category';

export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: number;
  title: string;
  note?: string;
  amount: number;
  type: TransactionType;
  date: string;
  category_id: number;
  category?: Category;
}

export interface CreateTransactionDTO {
  title: string;
  note?: string;
  amount: number;
  type: TransactionType;
  date?: string;
  category_id: number;
}

export type deleteTransactionType = (transaction_id: number) => void;
export type addTransactionType = (transaction: CreateCategoryDTO) => void;

