import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import Profile from '../pages/profile';
import Navbar from '../components/general/Navbar';
import { act } from 'react-dom/test-utils';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('../data/context/AuthContext', () => ({
  useAuth: () => ({
    userFound: 'example@example.com',
    unreadBell: false,
    setUnreadBell: jest.fn(),
    userImage: "1",
    setUserImage: jest.fn()
  })
}));

const mockRouterSetup = () => {
  mockRouter.push('/profile');
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

describe('Profile component', () => {
  let renderedComponent;

  const mockUsers = [
    {
      id: 0,
      username: 'example',
      img: "1",
      email: 'example@example.com',
      transactions: [
        {
          id: 0,
          img: 0,
          from: "example",
          to: "Blossom",
          payRequest: "pay",
          amount: 10,
          description: "test description",
          likes: 0,
          likedByUser: false,
          comments: []
        },
      ],
      balance: 1000,
      notifications: [],
    },
  ];

  beforeEach(() => {
    mockRouterSetup();
    renderedComponent = render(<Profile users={mockUsers} />);
  });

  it('should display the users information', async () => {
    const { getByTestId } = renderedComponent;
    
    await waitFor(() => {
      const username = screen.getByTestId("profile-username");
      const userEmail = getByTestId("profile-email");
      const atUsername = getByTestId("profile-atusername");
      const numberOfTransactions = getByTestId("profile-transactions");

      expect(username).toBeInTheDocument(); 
      expect(userEmail).toBeInTheDocument();
      expect(atUsername).toBeInTheDocument();
      expect(numberOfTransactions).toBeInTheDocument();

      expect(username.textContent).toBe("example");
      expect(userEmail.textContent).toBe("example@example.com");
      expect(atUsername.textContent).toBe("@example");
      expect(numberOfTransactions.textContent).toBe("1 transactions");
    });
  });
});
