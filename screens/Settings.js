import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

export default function Settings({ navigation }) {

    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.headerContainer}>
                <Header
                    containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent' }}
                    centerComponent={{ text: 'Settings', style: { color: '#000', fontSize: 24, fontFamily: 'Times New Roman' } }}
                    rightComponent={<Icon name='arrow-forward' color='#000' size={30} onPress={() => navigation.navigate('Dashboard')} />}
                />
            </View>
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