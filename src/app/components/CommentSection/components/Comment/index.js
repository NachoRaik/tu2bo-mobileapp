import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import styles from './styles';
import CommentText from './components/CommentText';

function Comment({ image, text, user, onRefPress, onUserClick }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onUserClick}>
        <Image source={{ uri: image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <TouchableOpacity onPress={onUserClick}>
          <Text style={styles.user}>{user}</Text>
        </TouchableOpacity>

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
