
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOtgkigEBgJ7J2oTvuY1TKjTywg1CDmKw",
  authDomain: "webhotrosinhvien-47ab4.firebaseapp.com",
  databaseURL: "https://webhotrosinhvien-47ab4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webhotrosinhvien-47ab4",
  storageBucket: "webhotrosinhvien-47ab4.appspot.com",
  messagingSenderId: "861481167022",
  appId: "1:861481167022:web:0b3b2581e742cb09fce53f",
  measurementId: "G-3TE58QDWES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;