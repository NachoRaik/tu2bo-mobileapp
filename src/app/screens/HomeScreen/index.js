import React from 'react';
import { SafeAreaView, Text } from 'react-native';

import styles from './styles';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HOME!</Text>
    </SafeAreaView>
  );
}

export default HomeScreen;
