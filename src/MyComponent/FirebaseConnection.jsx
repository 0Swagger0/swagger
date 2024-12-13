import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZEMlmST2AOyeQwnbF3K6RRe3GQDhb_VA",
  authDomain: "swagger-f3ad8.firebaseapp.com",
  databaseURL: "https://swagger-f3ad8-default-rtdb.firebaseio.com",
  projectId: "swagger-f3ad8",
  storageBucket: "swagger-f3ad8.appspot.com",
  messagingSenderId: "292837661069",
  appId: "1:292837661069:web:3144f69d8443647d1105c4",
  measurementId: "G-YMZ5ZL8L53",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FireStoreDatabase = getFirestore(app);
export const Auth = getAuth(app);
export const SignInWithPhoneNumber = signInWithPhoneNumber;
