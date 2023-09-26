const { initializeTestApp } = require('@firebase/testing');
const { admin, db } = require('./firebase.test');
require('dotenv').config();

global.testApp = initializeTestApp({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
});

beforeAll(async () => {
  await admin.firestore().clearFirestoreData({ projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId });
});

afterAll(async () => {
  await Promise.all(global.testApp.apps.map((app) => app.delete()));
});
