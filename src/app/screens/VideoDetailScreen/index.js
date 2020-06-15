import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import VideoPlayer from '@components/VideoPlayer';
import CommentSection from '@components/CommentSection';
import LikeButton from '@components/LikeButton';
import actionCreators from '@redux/videos/actions';
import { getFormatTimestamp } from '@utils/date';
import { updateLikedVideo } from '@services/VideoService';

import { formatDate } from './utils';

import styles from './styles';

function VideoDetailScreen({ navigation, route }) {
  const { id, url, title, author, description, date } = route?.params?.video;
  const [liked, setLiked] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  const dispatch = useDispatch();

  const comments = useSelector((state) => state.videos.comments);
  const commentsLoading = useSelector((state) => state.videos.loading);

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    dispatch(actionCreators.getVideoComments(id));
  }, [dispatch, id]);

  navigation.setOptions({
    title: title
  });

  const onRefPress = useCallback(
    (miliseconds) => videoRef?.playFromPositionAsync(miliseconds),
    [videoRef]
  );

  const submitComment = useCallback(
    (comment) =>
      dispatch(
        actionCreators.commentVideo(id, {
          author: user.username,
          content: comment,
          timestamp: getFormatTimestamp()
        })
      ),
    [dispatch, user, id]
  );

  const onLikeToggle = useCallback(async () => {
    const response = await updateLikedVideo(id, { liked: !liked });
    if (response.ok) {
      setLiked(!liked);
    } else {
      //TODO: Add error
    }
  }, [id, liked]);

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
          <LikeButton liked={liked} onLiked={onLikeToggle} />
        </View>
        <Text style={styles.subtitle}>{author && `by ${author}`}</Text>
        <Text style={styles.desc}>{description}</Text>
        <CommentSection
          loading={commentsLoading}
          comments={comments}
          onRefPress={onRefPress}
          onCommentSubmit={submitComment}
        />
      </View>
    </ScrollView>
  );
}

export default VideoDetailScreen;
