import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; 
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfigInfo = {
  apiKey: "AIzaSyCKx0UNJhvZ4Dq04RhMS57ZqkSkJ1Knu8E",
  authDomain: "cs4720-team4-study-app.firebaseapp.com",
  databaseURL: "https://cs4720-team4-study-app-default-rtdb.firebaseio.com",
  projectId: "cs4720-team4-study-app",
  storageBucket: "cs4720-team4-study-app.appspot.com",
  messagingSenderId: "728110932503",
  appId: "1:728110932503:web:defc1b1d61aeb84410f252",
  measurementId: "G-LE18F8B5W1"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfigInfo);

// Initialize Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore database
export const db = getFirestore(app);