import { SafeAreaView, StyleSheet, Dimensions, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Settings() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.appContainer}>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F3E9E1',
        overflow: 'hidden',
    },
});