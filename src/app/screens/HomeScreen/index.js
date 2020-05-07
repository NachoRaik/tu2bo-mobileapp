import React, { useCallback } from 'react';
import { SafeAreaView, Text, Button } from 'react-native';

import { ROUTES } from '@constants/routes';

import styles from './styles';

function HomeScreen({ navigation }) {
  const goToDetail = useCallback(
    () => navigation.navigate(ROUTES.VideoScreen),
    [navigation]
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Muro!</Text>
      <Button title="ver video" onPress={goToDetail} />
    </SafeAreaView>
  );
}

export default HomeScreen;
