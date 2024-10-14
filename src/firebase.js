// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KAY,
  authDomain: "asblog-9ee36.firebaseapp.com",
  projectId: "asblog-9ee36",
  storageBucket: "asblog-9ee36.appspot.com",
  messagingSenderId: "5115542916",
  appId: "1:5115542916:web:e08ba4b6b1087c858731d1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
