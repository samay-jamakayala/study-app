import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';

export default function Timer() {

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

    // Switches between Pomodoro to break, and vice versa
    const switchTimer = () => {
        setIsRunning(false);
        let newIndex = currentTimerIndex === 0 ? 1 : 0;
        setCurrentTimerIndex(newIndex);
        setTimer(newIndex);
    };

    // Timer functionality
    useEffect(() => {
        let interval = null;

        // Functionality for when timer reaches 0
        const handleTimerEnd = () => {
            clearInterval(interval);
            switchTimer();
            return 0;
        };

        // Countdown functionality
        const handleTimerRun = () => {
            return timeLeft - 1;
        };

        // Runs timer
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft <= 0 ? handleTimerEnd() : handleTimerRun());
            }, 1000);
        } else if (!isRunning && timeLeft !== 0) {
            // Paused timer
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, currentTimerIndex]);

    const isStarted = timeLeft !== timerDurations[currentTimerIndex];

    return (
        <View style={styles.timerContainer}>
            <View style={styles.timerLengthContainer}>
                <Button title="25 min" onPress={() => setTimer(0)} />
                <Button title="5 min" onPress={() => setTimer(1)} />
                <Button title="15 min" onPress={() => setTimer(2)} />
            </View>
            <View style={styles.timerCircle}>
                <Text style={styles.timer}>{Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
            </View>
            <View style={styles.timerControlCircle}>
                <View style={styles.timerControlContainer}>
                    <Pressable style={styles.button} onPress={() => setIsRunning(!isRunning)}>
                        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={resetTimer}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={switchTimer}>
                        <Text style={styles.buttonText}>Skip</Text>
                    </Pressable>
                </View>
            </View>
            <Text style={styles.timer}>{currentTimerIndex === 0 ? 'Pomodoro' : 'Break'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        alignItems: 'center',
    },
    timerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10, // Circle thickness
        borderColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontFamily: 'Times New Roman',
        fontSize: 60,
        marginBottom: 20,
        marginTop: 20,
    },
    timerLengthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    timerControlCircle: {
        width: 700,
        height: 700,
        borderRadius: 700,
        backgroundColor: '#D3CCC2',
        marginTop: 20,
        alignItems: 'center',
    },
    timerControlContainer: {
        flexDirection: 'row',
        marginTop: 60,
        alignItems: 'center',
        gap: 20,

    },
    button: {
        width: 100, // Adjust as needed
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        elevation: 10, // This adds a shadow on Android
        shadowColor: 'black', // This adds a shadow on iOS
        shadowOffset: { width: 0, height: 10 }, // This adds a shadow on iOS
        shadowOpacity: 0.5, // This adds a shadow on iOS
        shadowRadius: 10, // This adds a shadow on iOS
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    }
});