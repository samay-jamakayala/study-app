import { Dashboard, Login, Welcome } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}