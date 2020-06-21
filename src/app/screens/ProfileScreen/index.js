import React from 'react';
import { SafeAreaView, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import LogoutButton from '@components/LogoutButton';
import VideosList from '@components/VideosList';
import CustomButton from '@components/CustomButton';
import { COLORS } from '@constants/colors';

import RequestFriendshipButton from './components/RequestFriendshipButton';

import styles from './styles';
import { MY_VIDEOS, PROFILE, REQUESTS } from './constants';

function ProfileScreen({ navigation, route }) {
  const user_id = route?.params?.user_id;
  //const dispatch = useDispatch(); TODO: Add request to get profile
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.warn(currentUser);

  const isMyProfile = !user_id || user_id === parseInt(currentUser.id, 10);

  console.warn(isMyProfile);

  const profile = isMyProfile ? currentUser : PROFILE;

  const imageUrl =
    profile?.profile_info?.picture ||
    'https://i.ya-webdesign.com/images/default-avatar-png-18.png'; //TODO

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.detailContainer}>
          <View style={styles.user}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.username}>{profile.username}</Text>
            <Text>{profile.email}</Text>
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
            <RequestFriendshipButton />
          )}
        </View>
        <Text style={styles.title}>
          {isMyProfile ? 'Mis Videos' : `Videos de ${profile.username}`}
        </Text>
        <VideosList videos={MY_VIDEOS} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
