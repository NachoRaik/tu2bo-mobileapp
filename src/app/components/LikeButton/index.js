import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

function LikeButton({ likes, liked, onLiked }) {
  return (
    <View style={styles.container}>
      {!!likes && <Text style={styles.count}>{likes}</Text>}
      <TouchableOpacity onPress={onLiked}>
        <AntDesign name={liked ? 'like1' : 'like2'} size={28} color="red" />
      </TouchableOpacity>
    </View>
  );
}

export default LikeButton;
