import React, { useCallback } from 'react';
//import { TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';

import styles from './styles';

function VideoPlayer({ source, setVideoRef }) {
  const handleVideoRef = useCallback(
    (component) => {
      setVideoRef(component);
    },
    [setVideoRef]
  );

  return (
    <>
      <Video
        ref={handleVideoRef}
        source={{
          uri: source
        }}
        rate={1.0}
        isMuted={false}
        useNativeControls
        shouldPlay
        style={styles.video}
        resizeMode="contain"
      />
    </>
  );
}

export default VideoPlayer;
