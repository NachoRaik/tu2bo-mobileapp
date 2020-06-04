import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import VideoPlayer from '@components/VideoPlayer';

import styles from './styles';

function VideoDetailScreen({ navigation, route }) {
  const { url, title, author, description } = route?.params?.video;

  navigation.setOptions({
    title: title
  });

  return (
    <ScrollView style={styles.scrollArea} alwaysBounceVertical>
      <VideoPlayer source={url} style={{ alignSelf: 'center' }} />
      <View style={styles.videoInfo}>
        <Text style={styles.subtitle}>{author && `by ${author}`}</Text>
        <Text style={styles.title}>{description}</Text>
      </View>
    </ScrollView>
  );
}

export default VideoDetailScreen;
