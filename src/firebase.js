// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM7MJmjKAcH1FI4rlXmQoc9oiP9Ycz3qM",
  authDomain: "esther-realtor.firebaseapp.com",
  projectId: "esther-realtor",
  storageBucket: "esther-realtor.appspot.com",
  messagingSenderId: "974904319588",
  appId: "1:974904319588:web:a4d55aea4cc5565df18971"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore()