import React, { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';

function CommentInput({ onSubmit }) {
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
      <TouchableOpacity onPress={() => onSubmit(comment)}>
        <Text>Postear</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CommentInput;
