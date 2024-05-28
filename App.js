import React from 'react';
import Timer from './Timer';
import { View, StyleSheet, Button, Text} from 'react-native';
import LoginPage from "./Login"; // Importing the storeHighScore function from firebaseConfig.js

export default function App() {
  return (
    <View style={styles.appContainer}>
      {/* testing database input */}
      {/* <Button title="Add User" onPress={() => storeLogin('slay', '1234')} /> */}
      {/* <Text> 
      </Text> */}
      <Text> <LoginPage /> </Text>
      <Text> <Timer /> </Text>
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
