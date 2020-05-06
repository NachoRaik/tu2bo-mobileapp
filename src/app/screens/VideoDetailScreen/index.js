import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import VideoPlayer from '@components/VideoPlayer';

import styles from './styles';

function VideoDetailScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>VIDEO!</Text>
      <VideoPlayer />
    </SafeAreaView>
  );
}

export default VideoDetailScreen;
