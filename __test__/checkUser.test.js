import { checkUser } from './yourFirestoreFunctionsModule';
import { db } from '../../firebase.test';
import { transactions } from '../data/defaultTransactions.tsx';
import { notifications } from '../data/defaultNotifications.tsx.tsx';

describe('checkUser function', () => {
  const userRef = db.collection('users').doc('existingUser');

  afterEach(async () => {
    await userRef.delete();
  });

  it('should return true when user document exists', async () => {
    await userRef.set({
      username: 'existentUser',
      balance: 10000,
      img: '2',
      email: 'existentUser@gmail.com',
      transactions: transactions,
      notifications: notifications,  
      unreadNotifications: true,
    })

    const userExists = await checkUser('existingUser');
    expect(userExists).toBe(true);
  });

  it('should return default data when user document does not exist', async () => {
    const userData = await checkUser('nonexistentUser');
    expect(userData).toEqual({
      username: 'nonexistentUser',
      balance: 10000,
      img: '1',
      email: 'nonexistentUser@gmail.com',
      transactions: transactions,
      notifications: notifications,
      unreadNotifications: true,
    });
  });
});
