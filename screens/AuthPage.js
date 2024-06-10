import { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, Dimensions, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import Logo from '../assets/google-icon.svg';

export default function AuthPage() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSignUpNavigation = () => {
        if (validateEmail(email)) {
            setErrorMessage('');
            navigation.navigate('SignUp', { email: email });
        } else {
            setErrorMessage('Please enter a valid email address');
        }
    }

    const handleGoogleLogin = () => {
    }

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.title}>PomoFlow</Text>
            <Text style={styles.createAccountTextHead}>Create an account</Text>
            <Text style={styles.createAccountTextBody}>Enter your email to sign up for this app</Text>
            <TextInput
                style={styles.input}
                placeholder="email@domain.com"
                onChangeText={setEmail}
                value={email}
                onSubmitEditing={handleSignUpNavigation}
            />
            <Pressable style={styles.signUpLogInButton} onPress={handleSignUpNavigation}>
                <Text style={styles.signUpLogInButtonText}>Sign up with email</Text>
            </Pressable>
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
            </View>
            <Pressable style={styles.signUpLogInButton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signUpLogInButtonText}>Log in with email</Text>
            </Pressable>
            <Pressable style={styles.googleButton} onPress={handleGoogleLogin}>
                <Logo width={20} height={20} />
                <Text style={styles.googleButtonText}>Google</Text>
            </Pressable>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </SafeAreaView>
    );
}

export function SignUp({ route }) {
    const { email } = route.params;
    const [errorMessage, setErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const confirmPasswordInputRef = useRef();

    const navigation = useNavigation();

    const validatePassword = () => {
        // Check if password is at least 8 characters long
        if (password.length < 8) {
            setErrorMessage('Password should be at least 8 characters');
            return false;
        }

        // Check if password contains at least one letter
        if (!/[a-zA-Z]/.test(password)) {
            setErrorMessage('Password should contain at least one letter');
            return false;
        }

        // Check if password contains at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            setErrorMessage('Password should contain at least one uppercase letter');
            return false;
        }

        // Check if password contains at least one number
        if (!/\d/.test(password)) {
            setErrorMessage('Password should contain at least one number');
            return false;
        }

        // Check if password contains at least one special character
        if (!/[!@#$%^&*]/.test(password)) {
            setErrorMessage('Password should contain at least one special character');
            return false;
        }

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        }

        // If all checks pass, return true
        return true;
    }

    const handleSignUp = () => {
        if (validatePassword()) {
            setErrorMessage('');
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    // Sign up successful
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`${errorCode}: ${errorMessage}`);
                    if (errorCode === 'auth/email-already-in-use') {
                        setErrorMessage('Email already in use');
                    }
                    else {
                        setErrorMessage('Error creating user');
                    }
                });
        };
    }

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.title}>PomoFlow</Text>
            <Text style={styles.createAccountTextHead}>Create a password</Text>
            <Text style={styles.createAccountTextBody}>Create an confirm a password to continue</Text>
            <TextInput
                style={styles.input}
                placeholder="email@domain.com"
                value={email}
                editable={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
                returnKeyType="next"
            />
            <TextInput
                ref={confirmPasswordInputRef}
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={text => setConfirmPassword(text)}
                onSubmitEditing={() => handleSignUp}
            />
            <Pressable style={styles.signUpLogInButton} onPress={handleSignUp}>
                <Text style={styles.signUpLogInButtonText}>Create Account</Text>
            </Pressable>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </SafeAreaView>
    );
}

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const passwordInputRef = useRef();

    const handleSignIn = () => {
        setErrorMessage('');
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // navigation.navigate('Dashboard', { userCredential: userCredential });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}: ${errorMessage}`);
                if (errorCode === 'auth/invalid-credential') {
                    setErrorMessage('Email or password is incorrect');
                }
                if (errorCode === 'auth/invalid-email') {
                    setErrorMessage('Email or password is incorrect');
                    
                }
            });
    }

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.title}>PomoFlow</Text>
            <Text style={styles.createAccountTextHead}>Log in with your account</Text>
            <Text style={styles.createAccountTextBody}>Enter your email and password to continue</Text>
            <TextInput
                style={styles.input}
                placeholder="email@domain.com"
                onChangeText={setEmail}
                onSubmitEditing={() => passwordInputRef.current.focus()}
                returnKeyType="next"
            />
            <TextInput
                ref={passwordInputRef}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                onSubmitEditing={handleSignIn}
                returnKeyType="next"
            />
            <Pressable style={styles.signUpLogInButton} onPress={handleSignIn}>
                <Text style={styles.signUpLogInButtonText}>Log In</Text>
            </Pressable>
            <Pressable style={styles.forgotPassword}>
                <Text>Forgot your password?</Text>
            </Pressable>
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    title: {
        fontFamily: 'Times New Roman',
        fontSize: 50,
        marginTop: 100,
    },
    createAccountTextHead: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 60,
    },
    createAccountTextBody: {
        marginTop: 10,
        fontSize: 14,
    },
    input: {
        width: windowWidth * .85,
        height: 40,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    signUpLogInButton: ({ pressed }) => [
        {
            transform: [{ scale: pressed ? 0.95 : 1 }], // scale down when pressed
        },
        {
            width: windowWidth * .85,
            height: 40,
            backgroundColor: 'black',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
        },
    ],
    signUpLogInButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        width: windowWidth * .85,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#828282',
    },
    googleButton: ({ pressed }) => [
        {
            transform: [{ scale: pressed ? 0.95 : 1 }], // scale down when pressed
        },
        {
            flexDirection: 'row',
            width: windowWidth * .85,
            height: 40,
            backgroundColor: '#E0E0E0',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
        },
    ],
    googleButtonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 5,
        fontWeight: '600',
    },
    forgotPassword: {
        marginTop: 20,
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});