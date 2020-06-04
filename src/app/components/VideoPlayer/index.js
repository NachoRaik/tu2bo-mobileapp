import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';

import styles from './styles';

function VideoPlayer({ sources }) {
  const [videoRef, setVideoRef] = useState(null);

  const handleVideoRef = useCallback((component) => {
    setVideoRef(component);
  }, []);

  return (
    <>
      <Video
        ref={handleVideoRef}
        source={{
          uri: sources[0]
        }}
        rate={1.0}
        isMuted //={false}
        useNativeControls
        shouldPlay
        style={styles.video}
        resizeMode="contain"
      />
      {/*<TouchableOpacity onPress={() => videoRef?.playFromPositionAsync(4000)}>
        <Text>Click me 0.4</Text>
      </TouchableOpacity>*/}
    </>
  );
}

export default VideoPlayer;
