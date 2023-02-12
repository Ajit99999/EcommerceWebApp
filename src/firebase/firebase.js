import { initializeApp } from 'firebase/app'
import {getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAmHR6BjBZ-grcwtqWsFEWeoqMiWAl7LnY",
    authDomain: "ecommerceapp-163ee.firebaseapp.com",
    projectId: "ecommerceapp-163ee",
    storageBucket: "ecommerceapp-163ee.appspot.com",
    messagingSenderId: "923624056687",
    appId: "1:923624056687:web:15f4de5e835dff136a6a9a"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);