import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import LogoutButton from '@components/LogoutButton';
import VideosList from '@components/VideosList';
import { COLORS } from '@constants/colors';
import {
  getUserById,
  sendFriendRequest,
  getFriendRequests,
  acceptFriendshipRequest
} from '@services/UserService';

import StatusButton from './components/StatusButton';
import FriendshipRequests from './components/FriendshipRequests';

import styles from './styles';
import { MY_VIDEOS } from './constants';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ProfileScreen({ navigation, route }) {
  const [selection, setSelection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const user_id = route?.params?.user_id;

  const currentUser = useSelector((state) => state.auth.currentUser);

  const isMyProfile = !user_id || user_id === parseInt(currentUser.id, 10);

  const getRequests = useCallback(async () => {
    setLoading(true);
    const response = await getFriendRequests();
    if (response.ok) {
      setRequests(response.data);
    } else {
      setError(response.data.reason);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getUserById(
        user_id || parseInt(currentUser.id, 10)
      );
      if (response.ok) {
        setProfile(response.data);
      } else {
        setError(response.data.reason);
      }
      setLoading(false);
    }
    fetchData();
    if (isMyProfile) {
      getRequests();
    }
  }, [user_id, currentUser, getRequests, isMyProfile]);

  console.warn(profile);
  console.warn(requests);

  const imageUrl =
    profile?.profile_info?.picture ||
    'https://i.ya-webdesign.com/images/default-avatar-png-18.png'; //TODO

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator />
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
                status={profile.friendship_status}
              />
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setSelection(0)}>
              <Text style={[styles.title, selection === 0 && styles.selected]}>
                {isMyProfile ? 'Mis Videos' : `Videos de ${profile.username}`}
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
            <VideosList videos={MY_VIDEOS} navigation={navigation} />
          ) : (
            <FriendshipRequests requests={requests} />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default ProfileScreen;
