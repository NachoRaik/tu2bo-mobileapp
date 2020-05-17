import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import InitialLoading from '@screens/InitialLoading';
import HomeScreen from '@screens/HomeScreen';
import NotificationsScreen from '@screens/NotificationsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import VideoDetailScreen from '@screens/VideoDetailScreen';
import TabBarIcon from '@components/TabBarIcon';
import UserButton from '@components/UserButton';

const Stack = createStackNavigator();
const WallStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function WallStackScreen() {
  return (
    <WallStack.Navigator initialRouteName={ROUTES.Home}>
      <WallStack.Screen
        name={ROUTES.Home}
        component={HomeScreen}
        options={({ navigation }) => ({
          title: ROUTES.Wall,
          headerRight: () => <UserButton navigation={navigation} />
        })}
      />
      <WallStack.Screen
        name={ROUTES.VideoScreen}
        component={VideoDetailScreen}
        options={{ title: '' }}
      />
      <WallStack.Screen
        name={ROUTES.Profile}
        component={ProfileScreen}
        options={{ title: ROUTES.Profile }}
      />
    </WallStack.Navigator>
  );
}

function NotificationsStackScreen() {
  return (
    <WallStack.Navigator initialRouteName={ROUTES.Notifications}>
      <WallStack.Screen
        name={ROUTES.Notifications}
        component={NotificationsScreen}
        options={{ title: ROUTES.Notifications }}
      />
    </WallStack.Navigator>
  );
}

function TabNavigatorScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.main,
        inactiveTintColor: COLORS.gray
      }}>
      <Tab.Screen
        name={ROUTES.Wall}
        component={WallStackScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="md-home" focused={focused} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={ROUTES.Notifications}
        component={NotificationsStackScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="md-notifications" focused={focused} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.Login} headerMode="none">
        <Stack.Screen name={ROUTES.InitialLoading} component={InitialLoading} />
        <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
        <Stack.Screen name={ROUTES.SignUp} component={SignUpScreen} />
        <Stack.Screen name={ROUTES.Home} component={TabNavigatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
