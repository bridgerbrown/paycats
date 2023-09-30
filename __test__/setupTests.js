// __tests__/setupTests.js

const { execSync } = require('child_process');

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8081'; 
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9090'; 

execSync('firebase emulators:start', {
  stdio: 'inherit', 
  env: {
    ...process.env, 
  },
});
