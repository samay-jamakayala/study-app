import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import '../firebaseConfig';
// maybe you need this...
//

export default function LoginPage() {
    // Function to store high score in the database
    // export function storeLogin(userID, pass) {
    const storeLogin = (userID, pass) => {
        firebase.database().ref('users/' + userID).set({
            password: pass
        });
    }
    // firebase.database().ref('users/' + userID).set({
    //     password: pass
    // });
    return (
        <View style={styles.appContainer}>
            {/* testing database input */}
            <Button title="Add User" onPress={() => storeLogin('slay', '5678')} />
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