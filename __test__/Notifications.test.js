import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import Notifications from '../pages/notifications';
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
  mockRouter.push('/notifications');
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

describe('Notification component', () => {
  let renderedComponent;

  const mockUsers = [
    {
      id: 0,
      email: 'example@example.com',
      transactions: [],
      balance: 1000,
      notifications: [
        {
            id: 0,
            type: "signUp",
            message: "Congrats on signing up for PayCats!",
            read: false,
        }
      ],
    },
  ];

  beforeEach(() => {
    mockRouterSetup();
    renderedComponent = render(<Notifications users={mockUsers} />);
  });

  it('mark notifications as read on mouse over', async () => {
    const { getByTestId } = renderedComponent;

    const notificationUnread = getByTestId("notification-unread");
    expect(notificationUnread).toBeInTheDocument();

    await act( async () => {
      fireEvent.mouseOver(notificationUnread);
    });

    const notificationRead = getByTestId("notification-read");
    await waitFor(() => {
      expect(notificationRead).toBeInTheDocument();
    });
  });
});
