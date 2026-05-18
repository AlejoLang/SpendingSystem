import './App.css';
import TransactionsList from './components/TransactionsList';
import './App.css';
import { useRef } from 'react';
import AddTransactionModal from './components/AddTransactionModal';
import useTransactions from './hooks/useTransactions';
import useCategory from './hooks/useCategory';

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { transactions, addTransaction, removeTransaction } = useTransactions();
  const { categories, addCategory, removeCategory } = useCategory();

  return (
    <div className='app'>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className='openAddTransactionModal'
      >
        Add transaction
      </button>
      <TransactionsList
        transactions={transactions}
        removeTransaction={removeTransaction}
      />
      <AddTransactionModal
        ref={dialogRef}
        categories={categories}
        addTransaction={addTransaction}
      />
    </div>
  );
}

export default App;

