import { SafeAreaView, StyleSheet, Text, Button, Alert } from 'react-native';
import { getAuth, signOut, deleteUser } from "firebase/auth";
import app from '../firebaseConfig';

export default function Profile() {
    const auth = getAuth(app);
    const user = auth.currentUser;


    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // User signed out.
            })
            .catch((error) => {
                console.error('Error during sign out: ', error);
            });
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        if (user) {
                            deleteUser(user)
                                .then(() => {
                                    // User deleted.
                                })
                                .catch((error) => {
                                    console.error('Error during account deletion: ', error);
                                });
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text>Profile</Text>
            <Text>{user.email}</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
            <Button title="Delete Account" onPress={handleDeleteAccount} color="red" />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
});