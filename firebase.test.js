const { initializeTestApp, initializeAdminApp, getFirestore } = require('@firebase/testing');
require('dotenv').config();
const admin = initializeAdminApp({ projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId });
const db = getFirestore(admin);

module.exports = { admin, db };
