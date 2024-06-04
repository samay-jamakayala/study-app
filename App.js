import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Navbar from './Navbar';
import "./firebaseConfig";
import { SafeAreaView , StyleSheet } from 'react-native';
import TodoList from './Todolist';

export default function App() {
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);

  return (
    <SafeAreaView  style={styles.appContainer}>
      
      <Navbar currentTimerIndex={currentTimerIndex}/>
      <Timer currentTimerIndex={currentTimerIndex} setCurrentTimerIndex={setCurrentTimerIndex} />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3E9E1',
  }
});