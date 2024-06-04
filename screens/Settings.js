import { SafeAreaView, StyleSheet } from 'react-native';

export default function Settings() {

    return (
        <SafeAreaView style={styles.appContainer}>
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