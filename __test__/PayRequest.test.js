import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import PayRequest from '../pages/pay-request';
import Navbar from '../components/general/Navbar';
import { act } from 'react-dom/test-utils';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/AuthContext', () => ({
  useAuth: () => ({
    userFound: 'example@example.com',
    unreadBell: false,
    setUnreadBell: jest.fn()
  })
}));

const mockRouterSetup = () => {
  mockRouter.push('/pay-request');
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
    expect(navbarLogo.alt).toBe("PayCats logo");
  });
});

describe('PayRequest component', () => {
  let renderedComponent;

  const mockUsers = [
    {
      id: 0,
      email: 'example@example.com',
      transactions: [],
      balance: 1000,
      notifications: [],
    },
  ];

  beforeEach(() => {
    mockRouterSetup();
    renderedComponent = render(<PayRequest users={mockUsers} />);
  });

  it('should submit a payment', async () => {
    const { getByTestId } = renderedComponent;
    
    const dropdownButton = getByTestId("payrequest-dropdown-button");
    await act( async () => {
      fireEvent.click(dropdownButton);
    });

    const firstUserCard = getByTestId("payrequest-usercard-0")
    await waitFor(() => {
      expect(firstUserCard).toBeInTheDocument();
    })

    await act( async () => {
      fireEvent.click(firstUserCard);
    });

    const textArea = getByTestId("payrequest-textarea");
    expect(textArea).toBeInTheDocument();

    await act( async () => {
      fireEvent.change(textArea, { target: { value: "Test text area" }});
    });

    await waitFor(() => {
      expect(textArea.value).toBe("Test text area");
    });

    const amountInput = getByTestId("payrequest-amountinput");
    await act( async () => {
      fireEvent.input(amountInput, { target: { value: "3" }});
    });

    await waitFor(() => {
      expect(amountInput.value).toBe("3");
    });
  })
});
