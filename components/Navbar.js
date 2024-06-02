import React from "react";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Navbar({ currentTimerIndex }) {
    const timerDisplay = ["Work", "Short\nBreak", "Long\nBreak"];

    return (
        <View style={styles.navbarContainer}>
            <Pressable style={styles.iconButton}>
                <Icon name="cog" size={30} color="black" />
            </Pressable>
            <Text style={styles.timerTitle}>
                {timerDisplay[currentTimerIndex]}
            </Text>
            <Pressable style={styles.iconButton}>
                <Icon name="user" size={30} color="black" />
            </Pressable>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: windowWidth * .8,
        height: 54,
    },
    timerTitle: {
        fontSize: 24,
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        textAlign: 'center',
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
});
