// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClY9Nogyvl7g86gn2UzzD4ofv9ZOK28_w",
  authDomain: "academic-assistance-auth-66575.firebaseapp.com",
  projectId: "academic-assistance-auth-66575",
  storageBucket: "academic-assistance-auth-66575.appspot.com",
  messagingSenderId: "166091989085",
  appId: "1:166091989085:web:a32e2bcf3fb6455c3aedb4",
  measurementId: "G-6YC7FNY6EN",
  // apiKey: import.meta.env.API_KEY,
  // authDomain: import.meta.env.AUTH_DOMAIN,
  // projectId: import.meta.env.PROJECT_ID,
  // storageBucket: import.meta.env.STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.MESSAGING_SENDER,
  // appId: import.meta.env.APP_ID,
  // measurementId: import.meta.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
