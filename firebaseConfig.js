import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

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
const app = firebase.initializeApp(firebaseConfigInfo);

// Function to store high score in the database
export function storeHighScore(userID, score) {
  firebase.database().ref('users/' + userID).set({
    highscore: score
  });
}
