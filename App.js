import React from 'react';
import Timer from './Timer';
import firebase from 'firebase/compat/app';"./firebaseConfig";
import { View, StyleSheet, Button, Text} from 'react-native';
import database from 'firebase/compat/database';"./firebaseConfig";

// const firebaseConfig = {
//   apiKey: "AIzaSyCKx0UNJhvZ4Dq04RhMS57ZqkSkJ1Knu8E",
//   authDomain: "cs4720-team4-study-app.firebaseapp.com",
//   databaseURL: "https://cs4720-team4-study-app-default-rtdb.firebaseio.com",
//   projectId: "cs4720-team4-study-app",
//   storageBucket: "cs4720-team4-study-app.appspot.com",
//   messagingSenderId: "728110932503",
//   appId: "1:728110932503:web:defc1b1d61aeb84410f252",
//   measurementId: "G-LE18F8B5W1"
// };

// // testing to see if database works
// if(firebase.apps.length == 0){
//   firebase.initializeApp(firebaseConfig);
// }

// temporary just for testing//
export default function App() {
  function storeHighScore(userID, score){
    firebase.database().ref('users/' + userID).set(
      {
        highscore: score
      }
    ) 
  }

  return (
    <View style={styles.appContainer}>
      // put into different file later
      {/* testing database input */}
      <Button title="Add User" onPress={() => storeHighScore('001', 100)} />
      // put into different file later 
      <Text>
        <Timer />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150
  }
});