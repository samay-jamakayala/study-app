import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Pressable, Dimensions } from 'react-native';

export default function Timer({ currentTimerIndex, setCurrentTimerIndex }) {

    // Timer data 
    // 0: 25 min, 1: 5 min, 2: 15 min
    const timerDurations = [25 * 60, 5 * 60, 15 * 60];

    // Timer state
    const [timeLeft, setTimeLeft] = useState(timerDurations[0]);
    const [isRunning, setIsRunning] = useState(false);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentPageIndex = Math.round(scrollPosition / windowWidth);
        
        setIsRunning(false);
        const newIndex = currentPageIndex % timerDurations.length;
        setCurrentTimerIndex(newIndex); // Use modulus operator to cycle through the array
        setTimer(newIndex);
    };

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
        let newIndex = (currentTimerIndex + 1) % timerDurations.length;
        scrollViewRef.current?.scrollTo({
            x: newIndex * windowWidth, // Scroll to the correct page based on the index
            animated: true,
        });
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

    return (
        <View style={styles.timerContainer}>
            {/* <View style={styles.timerLengthContainer}>
                <Pressable style={styles.timerLengthTab(currentTimerIndex === 0)} onPress={() => setTimer(0)}>
                    <Text style={styles.timerLengthTabText}>Pomodoro</Text>
                </Pressable>
                <Pressable style={styles.timerLengthTab(currentTimerIndex === 1)} onPress={() => setTimer(1)}>
                    <Text style={styles.timerLengthTabText}>Short Break</Text>
                </Pressable>
                <Pressable style={styles.timerLengthTab(currentTimerIndex === 2)} onPress={() => setTimer(2)}>
                    <Text style={styles.timerLengthTabText}>Long Break</Text>
                </Pressable>
            </View> */}
            <View style={styles.timerScrollContainer}>
                <Animated.ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true, listener: handleScroll }
                    )}
                    scrollEventThrottle={16}
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                >
                    <View style={styles.scrollListItem}>
                        <View style={styles.timerCircle}>
                            <Text style={styles.timer}>{Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
                        </View>
                    </View>
                    <View style={styles.scrollListItem}>
                        <View style={styles.timerCircle}>
                            <Text style={styles.timer}>{Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
                        </View>
                    </View>
                    <View style={styles.scrollListItem}>
                        <View style={styles.timerCircle}>
                            <Text style={styles.timer}>{Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}</Text>
                        </View>
                    </View>
                </Animated.ScrollView>
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
        marginTop: 20,
        alignItems: 'center',
    },
    timerScrollContainer: {
        height: 180,
    },
    scrollListItem: {
        alignItems: 'center',
        width: windowWidth,
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
    // timerLengthTab: (selected) => [
    //     {
    //         opacity: selected ? 1 : 0.5,
    //         borderBottomWidth: selected ? 2 : 0,
    //         borderBottomColor: 'black', 
    //     },
    // ],
    // timerLengthTabText: {
    //     color: 'black',
    // },
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