import React from 'react';
import { render } from '@testing-library/react';
import TransactionsSection from '../components/transactions/TransactionsSection';
import TransactionCard from '../components/transactions/TransactionCard';
import { transactions } from '@/data/defaultTransactions';

describe('TransactionsSection component', () => {
  it('renders TransactionCard components for each transaction', () => {
    const { getAllByTestId } = render(<TransactionsSection transactions={transactions} />);
    const transactionCards = getAllByTestId('transaction-card');
    expect(transactionCards.length).toBe(transactions.length);
  })
  describe('TransactionCard', () => {
  })
})


