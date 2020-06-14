import React, { useState, useCallback } from 'react';
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
  const [videoRef, setVideoRef] = useState(null);

  navigation.setOptions({
    title: title
  });

  const onRefPress = useCallback(
    (miliseconds) => videoRef?.playFromPositionAsync(miliseconds),
    [videoRef]
  );

  return (
    <ScrollView style={styles.scrollArea} alwaysBounceVertical>
      <VideoPlayer
        source={url}
        style={{ alignSelf: 'center' }}
        setVideoRef={setVideoRef}
      />
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
        <CommentSection comments={COMMENTS} onRefPress={onRefPress} />
      </View>
    </ScrollView>
  );
}

export default VideoDetailScreen;
