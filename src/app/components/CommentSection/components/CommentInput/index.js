import React, { useState, useCallback } from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import { COLORS } from '@constants/colors';

import styles from './styles';

function CommentInput({ onSubmit }) {
  const [comment, setComment] = useState('');

  const onCommentSubmit = useCallback(() => {
    onSubmit(comment);
    setComment('');
  }, [comment, onSubmit]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setComment}
        value={comment}
        label="Comment"
        placeholder="Ingrese un comentario"
      />
      <FontAwesome.Button
        name="send"
        backgroundColor={COLORS.white}
        color={COLORS.main}
        size={20}
        onPress={onCommentSubmit}
      />
    </View>
  );
}

export default CommentInput;
