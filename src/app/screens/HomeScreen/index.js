import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';

import VideosList from '@components/VideosList';
import actionCreators from '@redux/videos/actions';

import styles from './styles';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.videos.videos);
  const videosLoading = useSelector((state) => state.videos.loading);

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
