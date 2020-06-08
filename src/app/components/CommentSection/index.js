import React, { useCallback } from 'react';
import { View, Text } from 'react-native';

import Comment from './components/Comment';
import CommentInput from './components/CommentInput';

import styles from './styles';

function CommentSection({ comments }) {
  const renderComment = useCallback(
    (item) => (
      <Comment
        key={item.id.toString()}
        user={item.username}
        text={item.comment}
        image={item.imageUrl || undefined}
      />
    ),
    []
  );

  return (
    <View style={styles.commentSection}>
      <Text style={styles.title}>Comentarios</Text>
      <View style={styles.container}>
        {comments.map((item) => renderComment(item))}
      </View>
      <CommentInput />
    </View>
  );
}

export default CommentSection;
