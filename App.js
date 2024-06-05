import { useState } from 'react';
import { Dashboard, AuthPage, SignUp, Login, Welcome, Profile, Settings } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import app from './firebaseConfig';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Load isSignedIn state from local storage
  useEffect(() => {
    const loadAuthStateFromStorage = async () => {
      const storedAuthState = await AsyncStorage.getItem('isSignedIn');
      if (storedAuthState) {
        setIsSignedIn(JSON.parse(storedAuthState));
      }
    };

    loadAuthStateFromStorage();
  }, []);

  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
    }
    else {
      setIsSignedIn(false);
    }
  });

  return (
    <NavigationContainer>

      {isSignedIn ? (

        <Tab.Navigator
          tabBar={() => null}
          initialRouteName="Dashboard"
        >
          <Tab.Screen name="Settings" component={Settings} />
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="AuthPage" component={AuthPage} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}