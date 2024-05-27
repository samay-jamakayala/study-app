import React from 'react';
import Timer from './Timer';
import { View, StyleSheet, Button, Text} from 'react-native';
import { storeHighScore } from "./firebaseConfig"; // Importing the storeHighScore function from firebaseConfig.js
import { Database } from 'firebase/database';

export default function App() {
  return (
    <View style={styles.appContainer}>
      {/* testing database input */}
      <Button title="Add User" onPress={() => storeHighScore('004', '100')} />
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
