import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TransactionsSection from '../components/transactions/TransactionsSection';
import TransactionCard from '../components/transactions/TransactionCard';
import { transactions } from '../data/defaultTransactions';
import { act } from 'react-dom/test-utils';
import mockRouter from 'next-router-mock';
import Navbar from '../components/general/Navbar';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/AuthContext', () => ({
  useAuth: () => ({
    userFound: 'example@example.com',
    unreadBell: false,
    setUnreadBell: jest.fn()
  })
}));

const mockRouterSetup = () => {
  mockRouter.push('/');
};

describe('next-router-mock', () => {
  it('mocks the useRouter hook', () => {
    mockRouterSetup();
  });
});

describe('Navbar component', () => {
  it('should render without errors', () => {
    const { getByTestId } = render(<Navbar />);
    const navbarLogo = getByTestId("navbar-logo");
    expect(navbarLogo.alt).toBe("PayCats logo")
  });
});

describe('TransactionsSection component', () => {
  beforeEach(() => {
    mockRouterSetup();
  });

  it('renders TransactionCard components for each transaction', async () => {
    const { getAllByTestId } = render(<TransactionsSection transactions={transactions} />);

    const transactionCards = getAllByTestId(/^transaction-card-\d+$/);
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
      const imageElement = getByTestId('transaction-0-image');

      const alt = `transaction sender, ${testTransaction.from}`;
      expect(imageElement.alt).toContain(alt);
    });

    it('renders the correct transaction type', () => {
      const { getByTestId } = renderedComponent;
      const transactionText = getByTestId("transaction-0-type-pay");
      expect(transactionText.textContent).toBe(`${testTransaction.from} paid ${testTransaction.to}`)
    });

    it('renders the correct number of likes and comments', () => {
      const { getByTestId } = renderedComponent;

      const likesCount = getByTestId("transaction-0-likes-count");
      expect(likesCount.textContent).toBe("3");
      const commentsCount = getByTestId("transaction-0-comments-count");
      expect(commentsCount.textContent).toBe("1");
    });

    it('adds/removes a like and changes heart image when like button is clicked', async () => {
      const { getByTestId } = renderedComponent;
      const likeButton = getByTestId("transaction-0-like-button");
      const likesCount = getByTestId("transaction-0-likes-count");

      expect(likesCount.textContent).toBe("3");
      expect(likeButton.alt).toContain("Like button, transaction not liked");

      await act( async () => {
        fireEvent.click(likeButton);
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(likesCount.textContent).toBe("4");
      expect(likeButton.alt).toContain("Like button, transaction liked");

      await act( async () => {
        fireEvent.click(likeButton);
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(likesCount.textContent).toBe("3");
      expect(likeButton.alt).toContain("Like button, transaction not liked");
    });
  
    it('adds a new comment properly', async () => {
      const { getByTestId } = renderedComponent;
      const commentsDropdown = getByTestId("transaction-0-comments-dropdown");
      const commentsCount = getByTestId("transaction-0-comments-count");

      await act( async () => {
        fireEvent.click(commentsDropdown);
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const commentTextArea = getByTestId("transaction-0-comment-textarea");
      await act( async () => {
        fireEvent.change(commentTextArea, { target: { value: "Test comment" } });
      });
      expect(commentTextArea.value).toBe("Test comment");

      const commentSubmitButton = getByTestId("transaction-0-comment-submit");
      await act( async () => {
        fireEvent.click(commentSubmitButton);
      });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      expect(commentsCount.textContent).toBe("2");
    }) 
  });
});
