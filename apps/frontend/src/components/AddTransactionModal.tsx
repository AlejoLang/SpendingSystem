import type { FormEvent } from 'react';
import type {
  addTransactionType,
  Category,
  CreateTransactionDTO,
  TransactionType,
} from '@spendingsystem/shared';
import './AddTransactionModal.css';

function AddTransactionModal({
  ref,
  categories = [],
  addTransaction,
}: {
  ref: React.RefObject<HTMLDialogElement>;
  categories?: Category[];
  addTransaction: addTransactionType;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const handleAddTransaction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const type = formData.get('type');
    const dateStr = String(formData.get('date') ?? '').trim();
    let dateObj: Date | null = null;
    if (dateStr) {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        dateObj = parsed;
      }
    }

    const transaction: CreateTransactionDTO = {
      title: String(formData.get('title') ?? '').trim(),
      amount: Number(formData.get('amount')),
      type: String(type) as TransactionType,
      category_id: Number(formData.get('category_id')),
    };

    if (dateObj) {
      transaction.date = dateObj.toISOString();
    }

    addTransaction(transaction);

    ref.current.close();
  };

  return (
    <dialog className='addTransactionModal' ref={ref}>
      <form
        className='addTransactionForm'
        id='addTransactionForm'
        onSubmit={handleAddTransaction}
      >
        <div>
          <label htmlFor='addTransactionName'>Name</label>
          <input
            name='title'
            type='text'
            id='addTransactionName'
            className='addTransactionName'
            placeholder='Transaction name'
            required
          />
        </div>
        <div>
          <label htmlFor='transactionCategorySelect'>Category</label>
          <select
            id='transactionCategorySelect'
            name='category_id'
            required
            defaultValue=''
          >
            {categories.map((cat) => {
              return (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Type</label>
          <div className='transactionTypeDiv'>
            <input
              type='radio'
              id='transactionTypeIncome'
              name='type'
              value='INCOME'
              required
            />
            <label
              htmlFor='transactionTypeIncome'
              className='transactionTypeIncomeLabel'
            >
              INCOME
            </label>
            <input
              type='radio'
              id='transactionTypeExpense'
              name='type'
              value='EXPENSE'
              defaultChecked={true}
            />
            <label
              htmlFor='transactionTypeExpense'
              className='transactionTypeExpenseLabel'
            >
              EXPENSE
            </label>
          </div>
        </div>
        <div>
          <label htmlFor='transactionAmount'>Amount</label>
          <input
            name='amount'
            type='number'
            className='transactionAmount'
            id='transactionAmount'
            placeholder='0'
            required
          />
        </div>
        <div>
          <label htmlFor='transactionDate'>Date</label>
          <input
            name='date'
            type='date'
            id='transactionDate'
            className='transactionDate'
            defaultValue={today}
          />
        </div>
        <button type='submit' className='transactionFormSubmit'>
          Add transaction
        </button>
      </form>
    </dialog>
  );
}

export default AddTransactionModal;

