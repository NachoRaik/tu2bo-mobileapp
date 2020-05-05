import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ROUTES } from '@constants/routes';
import LoginScreen from '@screens/LoginScreen';
import InitialLoading from '@screens/InitialLoading';
import HomeScreen from '@screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.Login} headerMode="none">
        <Stack.Screen name={ROUTES.InitialLoading} component={InitialLoading} />
        <Stack.Screen
          name={ROUTES.Login}
          component={LoginScreen}
          options={{ title: ROUTES.Login }}
        />
        <Stack.Screen
          name={ROUTES.Home}
          component={HomeScreen}
          options={{ title: ROUTES.Home }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
