import React from 'react';
import { Text, View, Image } from 'react-native';

import styles from './styles';
import CommentText from './components/CommentText';

function Comment({ image, text, user, onRefPress }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.user}>{user}</Text>
        <CommentText style={styles.text} text={text} onRefPress={onRefPress} />
      </View>
    </View>
  );
}

Comment.defaultProps = {
  image: 'https://i.ya-webdesign.com/images/default-avatar-png-18.png',
  text: '',
  user: ''
};

export default Comment;
