import React, { useCallback } from 'react';
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
        style={styles.video}
        resizeMode="contain"
      />
    </>
  );
}

export default VideoPlayer;
