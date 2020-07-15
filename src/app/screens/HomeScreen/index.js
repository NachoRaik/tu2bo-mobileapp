import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import * as Notifications from 'expo-notifications';

import { ROUTES } from '@constants/routes';
import { registerForPushNotifications } from '@services/NotificationService';
import VideosList from '@components/VideosList';
import actionCreators from '@redux/videos/actions';

import { notificationHanlder } from './utils';

import styles from './styles';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.videos.videos);
  const videosLoading = useSelector((state) => state.videos.loading);
  const me = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    registerForPushNotifications(me.username);
    Notifications.addNotificationReceivedListener((notification) => {
      console.warn(notification);
    });
    Notifications.addNotificationResponseReceivedListener((response) => {
      const {type, ...data} = response.notification.request.content.data;
      const { redirect, payload } = notificationHanlder(
        response.notification.request.content.data
      )[type];
      navigation.navigate(redirect, payload);
    });
    return () => Notifications.removeAllNotificationListeners();
  }, [me, navigation]);

  useEffect(() => {
    dispatch(actionCreators.getVideos());
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    dispatch(actionCreators.getVideos());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <VideosList
        navigation={navigation}
        videos={videos}
        loading={videosLoading}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
