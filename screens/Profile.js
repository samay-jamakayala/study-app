import { SafeAreaView, StyleSheet, Text, Button, Alert, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { signOut, deleteUser } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import { doc, deleteDoc } from "firebase/firestore";
// Required for side-effects
import "firebase/firestore";

export default function Profile() {
    const user = auth.currentUser

    const handleSignOut = () => {
        signOut(auth)
            .then(async () => {
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
                                .then(async () => {
                                    // Delete tasks from database
                                    const docRef = doc(db, "tasks", user.email.toLowerCase());
                                    await deleteDoc(doc(docRef));
                                })
                                .catch(async (error) => {
                                    console.error('Error during account deletion: ', error);
                                    const docRef = doc(db, "tasks", user.email.toLowerCase());
                                    await deleteDoc(doc(docRef));
                                });
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.headerContainer}>
                <Header
                    containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}
                    centerComponent={{ text: 'Profile', style: { color: '#000', fontSize: 24, fontFamily: 'Times New Roman' } }}
                    leftComponent={<Icon name='arrow-back' color='#000' size={30} onPress={() => navigation.navigate('Dashboard')} />}
                />
            </View>
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
    headerContainer: {
        width: '90%',
    },
});