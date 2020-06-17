import React from 'react';
import { SafeAreaView, Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import LogoutButton from '@components/LogoutButton';
import VideosList from '@components/VideosList';
import { COLORS } from '@constants/colors';

import styles from './styles';
import { MY_VIDEOS } from './constants';

function ProfileScreen({ navigation }) {
  //const dispatch = useDispatch(); TODO: Add request to get profile
  const user = useSelector((state) => state.auth.currentUser);

  const imageUrl =
    user.image || 'https://i.ya-webdesign.com/images/default-avatar-png-18.png'; //TODO

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.detailContainer}>
          <View style={styles.user}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.username}>{user.username}</Text>
            <Text>{user.email}</Text>
          </View>
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
        </View>
        <Text style={styles.title}>Mis Videos</Text>
        <VideosList videos={MY_VIDEOS} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;
