import type { Transaction, CreateTransactionDTO } from '@spendingsystem/shared';
import { useEffect, useState } from 'react';

function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>();

  useEffect(() => {
    fetch(import.meta.env.VITE_TRANSACTIONS_URL)
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        setTransactions(data);
      });
  }, []);

  const addTransaction = async (transaction: CreateTransactionDTO) => {
    const res = await fetch(import.meta.env.VITE_TRANSACTIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setTransactions((prev) => [data, ...prev]);
    }
  };

  const removeTransaction = async (transaction_id: number) => {
    const res = await fetch(
      import.meta.env.VITE_TRANSACTIONS_URL + '/' + transaction_id.toString(),
      {
        method: 'DELETE',
      },
    );
    if (res.ok) {
      setTransactions((prev) => prev.filter((t) => t.id != transaction_id));
    }
  };

  return { transactions, addTransaction, removeTransaction };
}

export default useTransactions;

