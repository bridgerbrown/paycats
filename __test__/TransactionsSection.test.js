import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

  describe('TransactionCard component', () => {
    const testTransaction = {
      id: 0,
      from: "Cilantro",
      to: "Blossom",
      payRequest: "pay",
      amount: 0,
      description: "SORRY THIS IS 4 MONTHS LATE",
      likes: 3,
      likedByUser: false,
      comments: [
        {
            from: "Blossom",
            message: "I understand."
        },
      ]
    };

    let renderedComponent;

    beforeEach(() => {
      renderedComponent = render(<TransactionCard transaction={testTransaction} />);
    });

    it('renders the transaction users image', () => {
      const { getByTestId } = renderedComponent;
      const imageElement = getByTestId('transaction-image');

      const alt = `transaction sender, ${testTransaction.from}`;
      expect(imageElement.alt).toContain(alt);
    });

    it('renders the correct transaction type', () => {
      const { getByTestId } = renderedComponent;
      const transactionText = getByTestId("transaction-type-pay");
      expect(transactionText.textContent).toBe(`${testTransaction.from} paid ${testTransaction.to}`)
    });

    it('renders the correct number of likes and comments', () => {
      const { getByTestId } = renderedComponent;

      const likesAmount = getByTestId("likes-count");
      expect(likesAmount.textContent).toBe("3");
      const commentAmount = getByTestId("comments-count");
      expect(commentAmount.textContent).toBe("1");
    });

    it('adds/removes a like and changes heart image when like button is clicked', async () => {
      const { getByTestId } = renderedComponent;
      const likeButton = getByTestId("like-button");
      const likesAmount = getByTestId("likes-count");

      expect(likesAmount.textContent).toBe("3");
      expect(likeButton.alt).toContain("Like button, transaction not liked");

      fireEvent.click(likeButton);
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(likesAmount.textContent).toBe("4");
      expect(likeButton.alt).toContain("Like button, transaction liked");

      fireEvent.click(likeButton);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(likesAmount.textContent).toBe("3");
      expect(likeButton.alt).toContain("Like button, transaction not liked");
    });

  });
});
