import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, Alert, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { signOut, deleteUser, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebaseConfig';
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
// Required for side-effects
import "firebase/firestore";

export default function Profile({ navigation }) {
    const user = auth.currentUser;
    const [image, setImage] = useState(null);
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef).then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUsername(userData.username);
                    setBio(userData.bio);
                    setImage(userData.profileImage);
                }
            });
        }
    }, [user]);

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

    // Can pick image
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            const response = await fetch(result.uri);
            const blob = await response.blob();
            const storageRef = ref(storage, `profileImages/${user.uid}`);
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
            setImage(downloadURL);

            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { profileImage: downloadURL }, { merge: true });

            updateProfile(user, { photoURL: downloadURL }).catch(error => console.error('Error updating profile image: ', error));
        }
    };

    const handleSaveProfile = async () => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                username: username,
                bio: bio,
                profileImage: image,
            }, { merge: true });
        }
    };

    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.headerContainer}>
                <Header
                    containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}
                    centerComponent={{ text: 'Profile', style: { color: '#000', fontSize: 24, fontFamily: 'Times New Roman'  } }}
                    leftComponent={<Icon name='arrow-back' color='#000' size={30} onPress={() => navigation.navigate('Dashboard')} />}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={image ? { uri: image } : require('../assets/default-profile.png')} style={styles.profileImage} />
                </TouchableOpacity>
                <Text style={styles.emailText}>{user.email}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setBio}
                    value={bio}
                    placeholder="Bio"
                />
                <Button title="Save" onPress={handleSaveProfile} />
                <Text style={styles.statsHeader}>Your Statistics</Text>
                <Text>Total Pomodoros: 0</Text>
                <Text>Total Study Time: 0 hours</Text>
                {/* Need proper logic for calculating stats */}
                <Text style={styles.achievementsHeader}>Achievements</Text>
                <Text>None</Text> 
                {/* Can add more here for achievements dependent on user. */}
                <Button title="Sign Out" onPress={handleSignOut} />
                <Button title="Delete Account" onPress={handleDeleteAccount} color="red" />
            </ScrollView>
        </SafeAreaView>
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
    scrollContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    emailText: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '80%',
        borderRadius: 5,
    },
    statsHeader: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    achievementsHeader: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
    },
});
