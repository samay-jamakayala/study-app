import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';

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
                <Pressable style={styles.timerLengthTab(currentTimerIndex === 0)} onPress={() => setTimer(0)}>
                    <Text style={styles.timerLengthTabText}>Pomodoro</Text>
                </Pressable>
                <Pressable style={styles.timerLengthTab(currentTimerIndex === 1)} onPress={() => setTimer(1)}>
                    <Text style={styles.timerLengthTabText}>Short Break</Text>
                </Pressable>
                <Pressable style={styles.timerLengthTab(currentTimerIndex === 2)} onPress={() => setTimer(2)}>
                    <Text style={styles.timerLengthTabText}>Long Break</Text>
                </Pressable>
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
                        <Text style={styles.buttonText}>Switch</Text>
                    </Pressable>
                </View>
                <View style={styles.todoPlaceHolder} />
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    timerContainer: {
        alignItems: 'center',
    },
    timerCircle: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderWidth: 12, // Circle thickness
        borderColor: '#F3F3F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timer: {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        fontSize: 55,
        marginBottom: 20,
        marginTop: 20,
    },
    timerLengthContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * .70, // 70% of screen width
        marginTop: 20,
        marginBottom: 10,
    },
    timerLengthTab: (selected) => [
        {
            opacity: selected ? 1 : 0.5,
            borderBottomWidth: selected ? 2 : 0,
            borderBottomColor: 'black', 
        },
    ],
    timerLengthTabText: {
        color: 'black',
    },
    timerControlCircle: {
        width: windowWidth * 1.75, // 175% of screen width
        height: windowWidth * 1.75, // 175% of screen width
        borderRadius: (windowWidth * 1.75) / 2, // Creates Circle
        backgroundColor: '#D3CCC2',
        marginTop: 20,
        alignItems: 'center',
    },
    timerControlContainer: {
        flexDirection: 'row',
        marginTop: 60,
        width: windowWidth * .8, // 80% of screen width
        justifyContent: 'space-between',

    },
    button: ({ pressed }) => [
        {
            transform: [{ scale: pressed ? 0.95 : 1 }], // scale down when pressed
        },
        {
            width: 95,
            height: 45,
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10, // This adds a shadow on Android
            shadowColor: 'black', // This adds a shadow on iOS
            shadowOffset: { width: 0, height: 5 }, // This adds a shadow on iOS
            shadowOpacity: 0.5, // This adds a shadow on iOS
            shadowRadius: 10, // This adds a shadow on iOS
        },
    ],
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    todoPlaceHolder: {
        width: windowWidth * 0.8, // 80% of screen width
        height: windowHeight * .40,
        backgroundColor: '#F3F3F3',
        borderRadius: 15,
        marginTop: 20,
    }
});