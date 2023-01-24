import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebase-keys";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()