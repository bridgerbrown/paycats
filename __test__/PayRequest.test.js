import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';
import UserSelectDropdown from '../components/user-dropdown/UserSelectDropdown';
import UserSelectCard from '../components/user-dropdown/UserSelectCard';
import PayRequest from '../pages/pay-request';
import { act } from 'react-dom/test-utils';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/AuthContext', () => ({
  useAuth: () => ({
    userFound: 'example@example.com',
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
    act(() => {
      fireEvent.click(dropdownButton);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const firstUserCard = getByTestId("payrequest-usercard-0")

    act(() => {
      fireEvent.click(firstUserCard);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const textArea = getByTestId("payrequest-textarea");
    act(() => {
      fireEvent.change(textArea, { target: { value: "Test text area" }});
    });

    expect(textArea.value).toBe("Test text area");

    const amountInput = getByTestId("payrequest-amountinput");
    act(() => {
      fireEvent.input(amountInput, { target: { value: "3" }});
    });

    expect(amountInput.value).toBe("3");

    const submitButton = getByTestId("payrequest-submit-button");
    act(() => {
      fireEvent.click(submitButton);
    });

    await mockRouter.waitForChange(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/my-transactions');
    });
  })
});
