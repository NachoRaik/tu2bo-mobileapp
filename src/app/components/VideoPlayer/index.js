import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';

import styles from './styles';

function VideoPlayer() {
  const [videoRef, setVideoRef] = useState(null);

  const handleVideoRef = useCallback((component) => {
    setVideoRef(component);
  }, []);

  return (
    <>
      <Video
        ref={handleVideoRef}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
        }}
        rate={1.0}
        isMuted={false}
        useNativeControls
        shouldPlay
        style={styles.video}
      />
      <TouchableOpacity onPress={() => videoRef?.playFromPositionAsync(4000)}>
        <Text>Click me 0.4</Text>
      </TouchableOpacity>
    </>
  );
}

export default VideoPlayer;
