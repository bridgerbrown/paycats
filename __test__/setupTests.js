// __test__/setupTests.js
import { spawn } from "child_process";
import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom'

/*
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8081'; 
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9090'; 

const emulatorProcess = spawn('firebase', ['emulators:start'], {
  stdio: 'inherit', 
  env: {
    ...process.env, 
  },
});

emulatorProcess.on('error', (error) => {
  console.error('Error starting Firebase emulators: ', error);
});

emulatorProcess.on('close', (code) => {
  if (code === 0) {
    console.log('Firebase emulators have shut down.')
  } else {
    console.error(`Firebase emulators process exited with code ${code}`);
  }
});

process.on('exit', () => {
  if (emulatorProcess && !emulatorProcess.killed) {
    emulatorProcess.kill();
  }
});

*/
