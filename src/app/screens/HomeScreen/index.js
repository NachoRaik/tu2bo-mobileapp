import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import VideoPlayer from '@components/VideoPlayer';

import styles from './styles';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HOME!</Text>
      <VideoPlayer />
    </SafeAreaView>
  );
}

export default HomeScreen;
