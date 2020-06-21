import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Button
} from 'react-native';

import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import VideoCard from '@components/VideoCard';
import styles from './styles';

function VideosList({ videos, loading, onRefresh, navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(false);
  }, [videos]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh();
  }, [onRefresh]);

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
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.main} />
      ) : videos.length ? (
        <FlatList
          data={videos}
          renderItem={renderVideo}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              colors={[COLORS.main, COLORS.main]}
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      ) : (
        <Button title="Refrescar" onPress={handleRefresh} />
      )}
    </SafeAreaView>
  );
}

export default VideosList;
