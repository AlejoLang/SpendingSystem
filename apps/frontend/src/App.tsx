import './App.css';
import TransactionsList from './components/TransactionsList';
import './App.css';
import { useRef } from 'react';
import useTransactions from './hooks/useTransactions';

function App() {
  const { transactions, addTransaction, removeTransaction } = useTransactions();

  return (
    <div className='app'>
      <TransactionsList
        transactions={transactions}
        removeTransaction={removeTransaction}
      />
    </div>
  );
}

export default App;

