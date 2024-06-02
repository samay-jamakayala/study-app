import { Dashboard, AuthPage, SignUp, Login, Welcome } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebaseConfig';

export default function App() {

  const Stack = createNativeStackNavigator();
  const initialRouteName = "Dashboard";

  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      initialRouteName = "Dashboard";
    }
    else {
      initialRouteName = "Welcome";
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initialRouteName}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="AuthPage" component={AuthPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}