import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import VideoPlayer from '@components/VideoPlayer';
import CommentSection from '@components/CommentSection';
import LikeButton from '@components/LikeButton';

import { COMMENTS } from './constants';
import { formatDate } from './utils';

import styles from './styles';

function VideoDetailScreen({ navigation, route }) {
  const { url, title, author, description, date } = route?.params?.video;
  const [liked, setLiked] = useState(false);

  navigation.setOptions({
    title: title
  });

  return (
    <ScrollView style={styles.scrollArea} alwaysBounceVertical>
      <VideoPlayer source={url} style={{ alignSelf: 'center' }} />
      <View style={styles.videoInfo}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text>{formatDate(date)}</Text>
          </View>
          <LikeButton liked={liked} onLiked={setLiked} />
        </View>
        <Text style={styles.subtitle}>{author && `by ${author}`}</Text>
        <Text style={styles.desc}>{description}</Text>
        <CommentSection comments={COMMENTS} />
      </View>
    </ScrollView>
  );
}

export default VideoDetailScreen;
