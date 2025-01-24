// import firebase from 'firebase/app';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6soBFp275JFpAr2N0gObQpjY9eNTFJwM",
  authDomain: "podularwebsite.firebaseapp.com",
  projectId: "podularwebsite",
  storageBucket: "podularwebsite.appspot.com",
  messagingSenderId: "1455789775",
  appId: "1:1455789775:web:26be7b768adf0114bf49ba",
  measurementId: "G-Q9LTXB5SY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
