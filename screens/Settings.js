import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';
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
            <View style={styles.settingsContainer}>
                <View style={styles.settingTab}>

                </View>
            </View>
        </SafeAreaView >
    );
}

// Design reference: https://www.figma.com/community/file/1331928498416249815
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    headerContainer: {
        width: windowWidth * .9,
    },
    settingsContainer: {
        width: windowWidth * .8
    },
    settingTab: {
        flex: 1,
        flexDirection: "row",
    }
});