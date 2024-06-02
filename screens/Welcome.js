import { SafeAreaView, StyleSheet, Dimensions, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.titleCircle}>
                <Text style={styles.title}>PomoFlow</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
                    <Text style={styles.buttonText}>Start</Text>
                </Pressable>
            </View>

        </SafeAreaView >
    );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F3E9E1',
        overflow: 'hidden',
    },
    titleCircle: {
        width: windowWidth * 1.75, // 175% of screen width
        height: windowWidth * 1.75, // 175% of screen width
        borderRadius: (windowWidth * 1.75) / 2, // Creates Circle
        backgroundColor: '#D3CCC2',
        marginTop: 180 + 54 + 40, // Lines up circle with dashboard circle (navbar height + timer height + padding)
        alignItems: 'center',
        overflow: 'hidden'
    },
    title: {
        fontFamily: 'Times New Roman',
        fontSize: 80,
        marginTop: 60,
    },
    button: ({ pressed }) => [
        {
            transform: [{ scale: pressed ? 0.95 : 1 }], // scale down when pressed
        },
        {
            width: windowWidth * .85,
            height: 35,
            backgroundColor: '#F3F3F3',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 100,
        },
    ],
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
    },
});