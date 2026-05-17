import type {
  deleteTransactionType,
  Transaction,
} from '@spendingsystem/shared';
import './TransactionItem.css';

function TransactionItem({
  transactionInfo,
  removeTransaction,
}: {
  transactionInfo: Transaction;
  removeTransaction: deleteTransactionType;
}) {
  return (
    <div className='transactionItem'>
      <span className='transactionItemTitle'>{transactionInfo.title}</span>
      <span className='transactionItemCategory'>
        {transactionInfo?.category?.name}
      </span>
      <span
        className='transactionItemAmount'
        style={{
          color: `${transactionInfo.type === 'INCOME' ? 'green' : 'red'}`,
        }}
      >
        {transactionInfo.type === 'INCOME' ? '+' : '-'}
        {transactionInfo.amount}
      </span>
      <button
        type='button'
        className='transactionItemDelete'
        onClick={() => removeTransaction(transactionInfo.id)}
      >
        D
      </button>
    </div>
  );
}

export default TransactionItem;

