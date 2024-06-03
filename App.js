import { useState } from 'react';
import { Dashboard, AuthPage, SignUp, Login, Welcome, Profile, Settings } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebaseConfig';

export default function App() {

  const Stack = createNativeStackNavigator();
  let initialRouteName = "Welcome";
  const [isSignedIn, setIsSignedIn] = useState(false);

  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      initialRouteName = "Dashboard";
      setIsSignedIn(true);
    }
    else {
      initialRouteName = "Welcome";
      setIsSignedIn(false);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initialRouteName}>
        {isSignedIn ? (
          <>
            {/* I want to look into possibly using tab navigation rather than stack for the future. */}
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                animation: 'slide_from_right',
              }} />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                animation: 'slide_from_left',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="AuthPage" component={AuthPage} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}