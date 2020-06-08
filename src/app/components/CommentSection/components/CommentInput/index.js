import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

import styles from './styles';

function CommentInput() {
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setComment}
        value={comment}
        label="Comment"
        placeholder="Ingrese un comentario"
      />
    </View>
  );
}

export default CommentInput;
