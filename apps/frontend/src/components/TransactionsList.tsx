import { useEffect, useState } from 'react';
import type {
  deleteTransactionType,
  Transaction,
} from '@spendingsystem/shared/src';
import TransactionItem from './TransactionItem';
import './TransactionsList.css';

function TransactionsList({
  transactions,
  removeTransaction,
}: {
  transactions: Transaction[];
  removeTransaction: deleteTransactionType;
}) {
  return (
    <div className='transactionsList'>
      {transactions?.map((tr) => {
        return (
          <TransactionItem
            transactionInfo={tr}
            removeTransaction={removeTransaction}
            key={tr.id}
          />
        );
      })}
    </div>
  );
}
export default TransactionsList;

