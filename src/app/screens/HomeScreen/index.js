import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Video } from 'expo-av';

import styles from './styles';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>HOME!</Text>
      <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        isLooping
        style={{ width: 300, height: 300 }}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;
