import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase.config';
import { transactions } from '../data/defaultTransactions';
import { notifications } from '../data/defaultNotifications';

interface UserData {
  username: string;
  balance: number;
  img: string;
  email: string;
  transactions: any[];
  notifications: any[];
  unreadNotifications: boolean;
}

async function getUserDocRef(user: string | null): Promise<any> {
  return doc(db, "users", `"${user}"`);
}

export async function checkUser(name: string): Promise<boolean | UserData> {
  const usersRef = await getUserDocRef(name);
  const docSnap = await getDoc(usersRef);
  const defaultData: UserData = {
    username: name.substring(0, name.lastIndexOf("@")),
    balance: 10000,
    img: "1",
    email: name,
    transactions: transactions,
    notifications: notifications,
    unreadNotifications: true,
  };
  if (docSnap.exists()) {
    return true;
  } else {
    await setDoc(doc(db, "users", `"${name}"`), defaultData);
    return defaultData;
  }
}

export async function getUserData(user: string | null): Promise<any> {
  const userRef = await getUserDocRef(user);
  const docSnap = await getDoc(userRef);
  return docSnap.data();
}

export async function changeUserImage(user: string, img: string): Promise<void> {
  const userRef = await getUserDocRef(user);
  await updateDoc(userRef, { img });
}

export async function transferMoney(user: string, balance: number): Promise<void> {
  const userRef = await getUserDocRef(user);
  await updateDoc(userRef, { balance: balance + 10000 });
}

export async function updateBalance(user: string, newBalance: number): Promise<void> {
  const userRef = await getUserDocRef(user);
  await updateDoc(userRef, { balance: newBalance });
}

export async function updateTransactions(user: string, allTransactions: any): Promise<void> {
  const userRef = await getUserDocRef(user);
  await updateDoc(userRef, { transactions: allTransactions });
}

export async function updateNotifications(user: string, allNotifications: any): Promise<void> {
  const userRef = await getUserDocRef(user);
  await updateDoc(userRef, { notifications: allNotifications });
}

export async function updateUnread(user: string, unread: boolean): Promise<void> {
  const userRef = await getUserDocRef(user);
  await updateDoc(userRef, { unreadNotifications: unread });
}
