// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-33b5c.firebaseapp.com",
  projectId: "mern-auth-33b5c",
  storageBucket: "mern-auth-33b5c.appspot.com",
  messagingSenderId: "185847494732",
  appId: "1:185847494732:web:aec2eb2cc9e9c1f4455ce9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);