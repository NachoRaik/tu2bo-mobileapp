import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import VideoPlayer from '@components/VideoPlayer';
import CommentSection from '@components/CommentSection';
import LikeButton from '@components/LikeButton';
import actionCreators from '@redux/videos/actions';
import { getFormatTimestamp } from '@utils/date';
import { updateLikedVideo, getVideoById } from '@services/VideoService';

import { formatDate } from './utils';

import styles from './styles';

function VideoDetailScreen({ navigation, route }) {
  const { id, url, title, author, description, date } = route?.params?.video;
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  const dispatch = useDispatch();

  const comments = useSelector((state) => state.videos.comments);
  const commentsLoading = useSelector((state) => state.videos.loading);

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    async function fetchData() {
      dispatch(actionCreators.getVideoComments(id));
      setLoading(true);
      const response = await getVideoById(id);
      if (response.ok) {
        setLiked(response.data.user_related_info.is_liked);
        setLikes(response.data.likes);
        setLoading(false);
      } else {
        //TODO: Add error
      }
    }
    fetchData();
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
      setLikes(likes + (liked ? -1 : 1));
      setLiked(!liked);
    } else {
      //TODO: Add error
    }
  }, [id, liked, likes]);

  return (
    <ScrollView style={styles.scrollArea} alwaysBounceVertical>
      <VideoPlayer
        source={url}
        style={{ alignSelf: 'center' }}
        setVideoRef={setVideoRef}
      />
      {loading ? (
        <ActivityIndicator color="red" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.videoInfo}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text>{formatDate(date)}</Text>
            </View>
            <LikeButton liked={liked} onLiked={onLikeToggle} likes={likes} />
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
      )}
    </ScrollView>
  );
}

export default VideoDetailScreen;
