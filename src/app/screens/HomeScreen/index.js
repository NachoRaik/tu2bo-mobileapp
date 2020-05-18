import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import VideoCard from '@components/VideoCard';
import actionCreators from '@redux/videos/actions';

import styles from './styles';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.videos.videos);
  const videosLoading = useSelector((state) => state.videos.loading);

  useEffect(() => {
    dispatch(actionCreators.getVideos());
  }, [dispatch]);

  const renderVideo = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={() =>
          navigation.navigate(ROUTES.VideoScreen, { video: item })
        }>
        <VideoCard
          title={item.title}
          thumb={item.thumb}
          subtitle={item.subtitle}
        />
      </TouchableOpacity>
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <SafeAreaView style={styles.container}>
      {videosLoading ? (
        <ActivityIndicator size="large" color={COLORS.main} />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderVideo}
          keyExtractor={keyExtractor}
        />
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
