import React from 'react';
import Timer from './Timer';
import "./firebaseConfig";
import { View, StyleSheet } from 'react-native';

export default function App() {

  return (
    <View style={styles.appContainer}>
      <Timer />
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