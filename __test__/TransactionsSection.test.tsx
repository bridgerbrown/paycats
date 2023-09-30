import React from 'react';
import { render } from '@testing-library/react';
import TransactionsSection from '../components/transactions/TransactionsSection';
import TransactionCard from '../components/transactions/TransactionCard';
import { transactions } from '@/data/defaultTransactions';
import { act } from 'react-dom/test-utils';

describe('TransactionsSection component', () => {
  it('renders TransactionCard components for each transaction', async () => {
    const { getAllByTestId } = render(<TransactionsSection transactions={transactions} />);
    await act(async () => {});

    const transactionCards = getAllByTestId('transaction-card');
    expect(transactionCards.length).toBe(transactions.length);
  })
  describe('TransactionCard', () => {
  })
})


