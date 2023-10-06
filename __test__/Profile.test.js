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
    userImage: 1,
    setUserImage: jest.fn(),
    updateUserImage: jest.fn()
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
      img: 1,
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

  it('should edit the users profile image', async () => {
    const { getByTestId } = renderedComponent;

    const imageChangeClosed = getByTestId("profile-imageChange-closed");
    expect(imageChangeClosed).toBeInTheDocument();

    await waitFor(() => {
      const originalImage = getByTestId("profile-image");
      expect(originalImage.alt).toBe("User profile picture number #1 of cat headshot")
    });

    const imageChangeEditButton = getByTestId("profile-editimgbutton");
    expect(imageChangeEditButton).toBeInTheDocument();
    
    await act( async () => {
      fireEvent.click(imageChangeEditButton);
    });

    await waitFor(() => {
      const imageChangeOpen = getByTestId("profile-imageChange-opened");
      expect(imageChangeOpen).toBeInTheDocument();
    });

    const newImageSelection = getByTestId("profile-imageChange-newImg");
    await act( async () => {
      fireEvent.click(newImageSelection);
    });
    
    const submitButton = getByTestId("profile-imageChange-submit");
    await act( async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      const imageChangeClosed = getByTestId("profile-imageChange-closed");
      expect(imageChangeClosed).toBeInTheDocument();
    });

    await waitFor(() => {
      const newImage = getByTestId("profile-image");
      expect(newImage.alt).toBe("User profile picture number #2 of cat headshot")
    });
  });
});
