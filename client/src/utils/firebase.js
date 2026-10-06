
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-platform-c2f7a.firebaseapp.com",
  projectId: "ai-interview-platform-c2f7a",
  storageBucket: "ai-interview-platform-c2f7a.firebasestorage.app",
  messagingSenderId: "10009107225",
  appId: "1:10009107225:web:41f0a83c36f56fe5f5c388",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}