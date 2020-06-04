import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import VideoPlayer from '@components/VideoPlayer';

import styles from './styles';

function VideoDetailScreen({ navigation, route }) {
  const { sources, title, subtitle, description } = route?.params?.video;

  navigation.setOptions({
    title: title
  });

  return (
    <ScrollView style={styles.scrollArea} alwaysBounceVertical>
      <VideoPlayer sources={sources} style={{ alignSelf: 'center' }} />
      <View style={styles.videoInfo}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.title}>{description}</Text>
      </View>
    </ScrollView>
  );
}

export default VideoDetailScreen;
