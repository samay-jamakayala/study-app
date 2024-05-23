import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  // Timer data 
  // 0: 25 min, 1: 5 min, 2: 15 min
  const timerDurations = [25 * 60, 5 * 60, 15 * 60];
  
  // Timer state
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timerDurations[0]);
  const [isRunning, setIsRunning] = useState(false);

  // Set timer to a specific duration using timerDurations array
  const setTimer = (timerIndex) => {
    setIsRunning(false);
    setTimeLeft(timerDurations[timerIndex]);
    setCurrentTimerIndex(timerIndex);
  }

  // Reset timer to same state
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerDurations[currentTimerIndex]);
  };
  
  // Timer functionality
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 0) {
            // Timer reaches end
            setIsRunning(false);
            clearInterval(interval);
            // Switch from pomodoro to break, or vice versa
            let newIndex = currentTimerIndex === 0 ? 1 : 0;
            setCurrentTimerIndex(newIndex);
            setTimer(newIndex);
            return 0;
          } else {
            // Timer is running
            return timeLeft - 1;
          }
        });
      }, 1000);
    } else if (!isRunning && timeLeft !== 0) {
      // Paused timer
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentTimerIndex]);


  return (
    <View>
      <Text>{Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
      <View>
        <Button title="25 min" onPress={() => setTimer(0)} />
        <Button title="5 min" onPress={() => setTimer(1)} />
        <Button title="15 min" onPress={() => setTimer(2)} />
      </View>
      <Button title={isRunning ? 'Pause' : 'Start'} onPress={() => setIsRunning(!isRunning)} />
      <Button title="Reset" onPress={resetTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  
});