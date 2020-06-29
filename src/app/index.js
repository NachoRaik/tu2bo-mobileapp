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
import ChatListScreen from '@screens/ChatListScreen';
import ProfileScreen from '@screens/ProfileScreen';
import ChatScreen from '@screens/ChatScreen';
import VideoDetailScreen from '@screens/VideoDetailScreen';
import UploadVideoScreen from '@screens/UploadVideoScreen';
import TabBarIcon from '@components/TabBarIcon';
import HeaderButtons from '@components/HeaderButtons';
//import LogoutButton from '@components/LogoutButton';

const Stack = createStackNavigator();
const WallStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function WallStackScreen() {
  return (
    <WallStack.Navigator initialRouteName={ROUTES.Home}>
      <WallStack.Screen
        name={ROUTES.Home}
        component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerRightContainerStyle: { flexDirection: 'row' },
          headerRight: () => <HeaderButtons navigation={navigation} />
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
      <WallStack.Screen
        name={ROUTES.UploadVideo}
        component={UploadVideoScreen}
        options={{ title: ROUTES.UploadVideo }}
      />
      <WallStack.Screen
        name={ROUTES.Chat}
        component={ChatScreen}
        options={{ title: '' }}
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
        component={HomeScreen}
        options={{
          title: 'Muro',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="md-home" focused={focused} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={ROUTES.ChatList}
        component={ChatListScreen}
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="md-chatbubbles" focused={focused} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.InitialLoading}
        headerMode="none">
        <Stack.Screen name={ROUTES.InitialLoading} component={InitialLoading} />
        <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
        <Stack.Screen name={ROUTES.SignUp} component={SignUpScreen} />
        <Stack.Screen name={ROUTES.Home} component={WallStackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
