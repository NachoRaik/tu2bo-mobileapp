import React from 'react';
import { string } from 'prop-types';
import { Text, View, Image } from 'react-native';

import styles from './styles';

function VideoCard({ thumb, title, subtitle }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: thumb }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    </View>
  );
}

VideoCard.defaultProps = {
  image: '',
  title: '',
  author: ''
};

VideoCard.propTypes = {
  image: string,
  title: string.isRequired,
  author: string.isRequired
};

export default VideoCard;
