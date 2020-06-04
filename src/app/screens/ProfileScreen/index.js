import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import LogoutButton from '@components/LogoutButton';

import styles from './styles';

function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LogoutButton navigation={navigation} />
    </SafeAreaView>
  );
}

export default ProfileScreen;
