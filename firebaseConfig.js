// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from 'react';
import * as firebase from 'firebase';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKx0UNJhvZ4Dq04RhMS57ZqkSkJ1Knu8E",
  authDomain: "cs4720-team4-study-app.firebaseapp.com",
  projectId: "cs4720-team4-study-app",
  storageBucket: "cs4720-team4-study-app.appspot.com",
  messagingSenderId: "728110932503",
  appId: "1:728110932503:web:defc1b1d61aeb84410f252",
  measurementId: "G-LE18F8B5W1"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);