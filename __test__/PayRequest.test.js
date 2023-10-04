import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { useRouter } from 'next/router';
import UserSelectDropdown from '../components/user-dropdown/UserSelectDropdown';
import UserSelectCard from '../components/user-dropdown/UserSelectCard';
import PayRequest from '../pages/pay-request';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/AuthContext', () => ({
  useAuth: () => ({
    userFound: 'testUser',
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
    
    fireEvent.click(dropdownButton);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const firstUserCard = getByTestId("payrequest-usercard-0")

    fireEvent.click(firstUserCard);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    expect(dropdownButton).toBeNaN();

    const textArea = getByTestId("payrequest-textarea");
    fireEvent.change(textArea, { target: { value: "Test text area" }});
    expect(textArea.value).toBe("Test text area");
  })
});
