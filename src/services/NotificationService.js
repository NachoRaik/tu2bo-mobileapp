import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { saveNotificationToken } from './FirestoreService';

export const registerForPushNotifications = async (username) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let token = await Notifications.getDevicePushTokenAsync();

  const expoToken = await Notifications.getExpoPushTokenAsync();

  console.warn(token);
  console.warn(expoToken);

  saveNotificationToken(token, expoToken, username);
};
