import React from 'react';
import { render } from '@testing-library/react';
import TransactionsSection from '../components/transactions/TransactionsSection';
import TransactionCard from '../components/transactions/TransactionCard';
import { transactions } from '../data/defaultTransactions';
import { act } from 'react-dom/test-utils';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const mockRouterSetup = () => {
  mockRouter.push('/');
};

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    mockRouterSetup();
  });
});

describe('TransactionsSection component', () => {
  beforeEach(() => {
    mockRouterSetup();
  });

  it('renders TransactionCard components for each transaction', async () => {
    const { getAllByTestId } = render(<TransactionsSection transactions={transactions} />);
    await act(async () => {});

    const transactionCards = getAllByTestId('transaction-card');
    expect(transactionCards.length).toBe(transactions.length);
  });
});
