import { useEffect, useState } from 'react';
import type { Transaction } from '@spendingsystem/shared/src';
import TransactionItem from './TransactionItem';
import './TransactionsList.css';

function TransactionsList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const deleteTransaction = (id: number) => {
    fetch(import.meta.env.VITE_TRANSACTIONS_URL + '/' + id.toString(), {
      method: 'DELETE',
    });
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id != id),
    );
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_TRANSACTIONS_URL)
      .then((res) => {
        return res.json();
      })
      .then((data: Transaction[]) => {
        setTransactions(data);
      });
  }, []);

  return (
    <div className='transactionsList'>
      {transactions?.map((tr) => {
        return (
          <TransactionItem
            transactionInfo={tr}
            deleteTransaction={deleteTransaction}
            key={tr.id}
          />
        );
      })}
    </div>
  );
}
export default TransactionsList;

