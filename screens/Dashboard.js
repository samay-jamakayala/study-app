import { useState } from 'react';
import {Timer, Navbar} from './components';
import { SafeAreaView , StyleSheet } from 'react-native';

export default function Dashboard() {
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