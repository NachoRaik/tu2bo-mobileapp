import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

function LikeButton({ liked, onLiked }) {
  return (
    <TouchableOpacity
      //style={[styles.button, style]}
      onPress={onLiked}>
      <AntDesign name={liked ? 'like1' : 'like2'} size={28} color="red" />
    </TouchableOpacity>
  );
}

export default LikeButton;
