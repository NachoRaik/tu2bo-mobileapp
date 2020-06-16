import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import VideoCard from '@components/VideoCard';
import actionCreators from '@redux/videos/actions';

import styles from './styles';

function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const videos = useSelector((state) => state.videos.videos);
  const videosLoading = useSelector((state) => state.videos.loading);

  console.warn(videos);

  useEffect(() => {
    dispatch(actionCreators.getVideos());
  }, [dispatch]);

  useEffect(() => {
    setRefreshing(false);
  }, [videos]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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
          subtitle={item.author}
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
          refreshControl={
            <RefreshControl
              colors={[COLORS.main, COLORS.main]}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
