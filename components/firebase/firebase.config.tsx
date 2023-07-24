import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.PAYCATS_API_KEY,
  authDomain: process.env.PAYCATS_AUTH_DOMAIN,
  projectId: process.env.PAYCATS_PROJECT_ID,
  storageBucket: process.env.PAYCATS_STORAGE_BUCKET,
  messagingSenderId: process.env.PAYCATS_MESSAGING_SENDER_ID,
  appId: process.env.PAYCATS_APP_ID,
  measurementId: process.env.PAYCATS_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
