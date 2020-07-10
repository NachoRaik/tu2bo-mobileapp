import { Notifications, Platform } from 'expo';
import * as Permissions from 'expo-permissions';
import { saveNotificationToken } from './FirestoreService';

export const registerForPushNotifications = async (username) => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('No notification permissions!');
    return;
  }

  // Get the token that identifies this device
  let response = await Notifications.getDevicePushTokenAsync();

  console.warn(response);

  saveNotificationToken(response, username);

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250]
    });
  }
};
