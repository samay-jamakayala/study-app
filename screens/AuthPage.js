import { StyleSheet, SafeAreaView, Text, TextInput, Dimensions, Pressable, View } from 'react-native';
import Logo from '../assets/google-icon.svg';

export default function AuthPage() {
    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.title}>PomoFlow</Text>
            <Text style={styles.createAccountTextHead}>Create an account</Text>
            <Text style={styles.createAccountTextBody}>Enter your email to sign up for this app</Text>
            <TextInput
                style={styles.input}
                placeholder="email@domain.com"
            />
            <Pressable style={styles.signUpLogInButton}>
                <Text style={styles.signUpLogInButtonText}>Sign up with email</Text>
            </Pressable>
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.dividerLine} />
            </View>
            <Pressable style={styles.signUpLogInButton}>
                <Text style={styles.signUpLogInButtonText}>Log in with email</Text>
            </Pressable>
            <Pressable style={styles.googleButton}>
                <Logo width={20} height={20} />
                <Text style={styles.googleButtonText}>Google</Text>
            </Pressable>
        </SafeAreaView>
    );
}

export function SignUp() {
    <SafeAreaView style={styles.appContainer}>
    </SafeAreaView>
}

export function Login() {
    <SafeAreaView style={styles.appContainer}>
    </SafeAreaView>
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
        borderColor: 'orange',
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
});