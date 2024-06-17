import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, remove } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyANSGd-W0yx3loEwgzrj0kMOQHFm516kfo",
  authDomain: "hfa-utak-test.firebaseapp.com",
  databaseURL:
    "https://hfa-utak-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hfa-utak-test",
  storageBucket: "hfa-utak-test.appspot.com",
  messagingSenderId: "14759560094",
  appId: "1:14759560094:web:d1b0c153146b3e1d36cc8f",
  measurementId: "G-V7KXXTZQ0W",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
