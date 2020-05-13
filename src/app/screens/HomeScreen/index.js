import React, { useCallback } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import { ROUTES } from '@constants/routes';
import VideoCard from '@components/VideoCard';

import { VIDEOS } from './constants';
import styles from './styles';

function HomeScreen({ navigation }) {
  const renderVideo = useCallback(
    ({ item }) => (
      <TouchableOpacity
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
      <FlatList
        data={VIDEOS}
        renderItem={renderVideo}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
