import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import actionCreator from '@redux/auth/actions';
import LogoutButton from '@components/LogoutButton';
import VideosList from '@components/VideosList';
import { COLORS } from '@constants/colors';
import {
  getUserById,
  getVideosById,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendshipRequest
} from '@services/UserService';
import { ROUTES } from '@constants/routes';

import StatusButton from './components/StatusButton';
import FriendshipRequests from './components/FriendshipRequests';

import styles from './styles';
import { IMAGE } from './constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfileScreen({ navigation, route }) {
  const [selection, setSelection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  const [openError, setopenError] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const user_id = route?.params?.user_id || parseInt(currentUser.id, 10);

  const isMyProfile = user_id === parseInt(currentUser.id, 10);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    navigation.dispatch(StackActions.popToTop());
    dispatch(actionCreator.logout());
    navigation.navigate(ROUTES.Login);
  }, [navigation, dispatch]);

  const getRequests = useCallback(async () => {
    setLoadingRequests(true);
    const response = await getFriendRequests();
    if (response.ok) {
      setRequests(response.data);
    } else {
      setError(response.data.reason);
    }
    setLoadingRequests(false);
  }, []);

  const onAcceptMyRequest = useCallback(
    async (id) => {
      const response = await acceptFriendshipRequest(id);
      if (response.ok) {
        getRequests();
      } else {
        setError(response.data.reason);
      }
    },
    [getRequests]
  );

  const getVideos = useCallback(async () => {
    setLoading(true);
    const response = await getVideosById(user_id);
    if (response.ok) {
      setVideos(response.data);
    } else {
      setError(response.data.reason);
    }
    setLoading(false);
  }, [user_id]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getUserById(user_id);
      if (response.ok) {
        setProfile(response.data);
      } else {
        setError(response.data.reason);
      }
      setLoading(false);
    }
    fetchData();
    getVideos();
    if (isMyProfile) {
      getRequests();
    }
  }, [user_id, getRequests, getVideos, isMyProfile]);

  useEffect(() => {
    if (error && !openError) {
      setopenError(true);
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'Logout',
            onPress: onLogout
          },
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

  const imageUrl = profile?.profile_info?.picture || IMAGE;

  return (
    <SafeAreaView style={styles.container}>
      {loading || !profile ? (
        <ActivityIndicator size="large" color={COLORS.main} />
      ) : (
        <ScrollView style={styles.scrollArea}>
          <View style={styles.detailContainer}>
            <View style={styles.user}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.username}>{profile?.username}</Text>
              <Text>{profile?.email}</Text>
            </View>
            {isMyProfile ? (
              <View style={styles.options}>
                <LogoutButton navigation={navigation} />
                <FontAwesome.Button
                  name="edit"
                  backgroundColor={COLORS.white}
                  color={COLORS.main}
                  size={30}
                  //onPress=TODO NAVIGATE EDIT PROFILE
                />
              </View>
            ) : (
              <StatusButton
                onRequest={() => sendFriendRequest(user_id)}
                onAccept={() => acceptFriendshipRequest(user_id)}
                status={profile?.friendship_status}
              />
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setSelection(0)}>
              <Text style={[styles.title, selection === 0 && styles.selected]}>
                {isMyProfile ? 'Mis Videos' : `Videos de ${profile?.username}`}
              </Text>
            </TouchableOpacity>
            {isMyProfile && (
              <TouchableOpacity onPress={() => setSelection(1)}>
                <Text
                  style={[styles.title, selection === 1 && styles.selected]}>
                  Solicitudes de amistad
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {!selection ? (
            <VideosList videos={videos} navigation={navigation} />
          ) : (
            <FriendshipRequests
              requests={requests}
              loading={loadingRequests}
              onAccept={onAcceptMyRequest}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default ProfileScreen;
