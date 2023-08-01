// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import firebase from 'firebase/compat/app';
import 'firebase/compat/app';
import 'firebase/compat/firestore';

/*
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
*/
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnZ7iRH5ABi_1wnBKzJSLWfgKLf1IJvfw",
  authDomain: "proj-tcc-a6eb4.firebaseapp.com",
  projectId: "proj-tcc-a6eb4",
  storageBucket: "proj-tcc-a6eb4.appspot.com",
  messagingSenderId: "4551255630",
  appId: "1:4551255630:web:7876477ed7f8d58c9bc51f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default firebase;