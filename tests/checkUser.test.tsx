import { checkUser } from "@/components/firebase/firestore";
import { getDoc } from "firebase/firestore";

jest.mock('firebase/firestore');


describe('checkUser function', () => {
  it('should return true if user exists', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({ exists: true });

    const existingUser = 'test@gmail.com';
    const result = await checkUser(existingUser);
    expect(result).toBe(true);
  })

  it('should create a new user with default data when user doesnt exist', async () => {
    (getDoc as jest.Mock).mockResolvedValueOnce({ exists: true });

    const newUser = 'newUser@test.com';
    const result = await checkUser(newUser);

    expect(result).toEqual(expect.objectContaining({
      username: expect.any(String),
      balance: 10000,
      img: '1',
      email: newUser,
      transactions: expect.any(Array),
      notifications: expect.any(Array),
      unreadNotifications: true,
    }));
  });
});
