import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import VideoPlayer from '@components/VideoPlayer';
import CommentSection from '@components/CommentSection';
import LikeButton from '@components/LikeButton';
import CustomButton from '@components/CustomButton';
import actionCreators from '@redux/videos/actions';
import { getFormatTimestamp } from '@utils/date';
import {
  updateLikedVideo,
  getVideoById,
  deleteVideo
} from '@services/VideoService';
import { ROUTES } from '@constants/routes';

import { formatDate } from './utils';

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

function VideoDetailScreen({ navigation, route }) {
  const {
    id,
    url,
    title,
    author,
    description,
    date,
    user_id
  } = route?.params?.video;
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const [error, setError] = useState('');
  const [openError, setopenError] = useState(false);

  const dispatch = useDispatch();

  const comments = useSelector((state) => state.videos.comments);
  const commentsLoading = useSelector((state) => state.videos.loading);

  const user = useSelector((state) => state.auth.currentUser);

  const isMyVideo = user.id === user_id;

  console.warn(isMyVideo);

  useEffect(() => {
    async function fetchData() {
      dispatch(actionCreators.getVideoComments(id));
      setLoading(true);
      const response = await getVideoById(id);
      if (response.ok) {
        setLiked(response.data.user_related_info.is_liked);
        setLikes(response.data.likes);
      } else {
        setError(response.data.reason);
      }
      setLoading(false);
    }
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (error && !openError) {
      setopenError(true);
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'OK',
            onPress: () => {
              setError('');
              setopenError(false);
            }
          }
        ],
        { cancelable: false }
      );
    }
  }, [error, openError]);

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
      setError(response.data.reason);
    }
  }, [id, liked, likes]);

  const navigateToProfile = useCallback(
    (userId) => {
      navigation.navigate(ROUTES.Profile, {
        user_id: userId
      });
      videoRef.stopAsync();
    },
    [navigation, videoRef]
  );

  const onDeleteVideo = useCallback(async () => {
    Alert.alert(
      'Borrar video',
      'Esta seguro que desea borrar el video',
      [
        {
          text: 'Si',
          onPress: async () => {
            const response = await deleteVideo(id);
            if (response.ok) {
              console.warn('se borro');
            }
          }
        },
        {
          text: 'No',
          onPress: () => console.warn('Cancel Pressed'),
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  }, [id]);

  return (
    <ScrollView style={styles.scrollArea} alwaysBounceVertical>
      <VideoPlayer
        source={url}
        style={styles.videoPlayer}
        setVideoRef={setVideoRef}
      />
      {loading ? (
        <ActivityIndicator color="red" style={styles.loader} />
      ) : (
        <View style={styles.videoInfo}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text>{formatDate(date)}</Text>
            </View>
            <LikeButton liked={liked} onLiked={onLikeToggle} likes={likes} />
          </View>
          <TouchableOpacity onPress={() => navigateToProfile(user_id)}>
            <Text style={styles.subtitle}>{author && `by ${author}`}</Text>
          </TouchableOpacity>
          <Text style={styles.desc}>{description}</Text>
          <CommentSection
            loading={commentsLoading}
            comments={comments}
            onRefPress={onRefPress}
            onCommentSubmit={submitComment}
            onUserClick={navigateToProfile}
          />
          {isMyVideo && (
            <View style={styles.actions}>
              <CustomButton
                text="BORRAR"
                style={styles.delete}
                textStyle={styles.deleteText}
                onPress={onDeleteVideo}
              />
              <CustomButton
                text="EDITAR"
                style={styles.edit}
                textStyle={styles.editText}
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default VideoDetailScreen;
