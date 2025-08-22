// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Make sure getAuth is imported
import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKK7zmBmiX3iHnuV9KFKTCwHePZiYHkI4",
  authDomain: "cinegpt-4e591.firebaseapp.com",
  projectId: "cinegpt-4e591",
  storageBucket: "cinegpt-4e591.firebasestorage.app",
  messagingSenderId: "370609148977",
  appId: "1:370609148977:web:9c98cfe7b090b06463b110",
  measurementId: "G-LZ60RFKWH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // This line exports the auth object

// You can also export the app itself as a default export if needed elsewhere
export default app;
