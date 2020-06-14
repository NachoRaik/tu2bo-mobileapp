import React, { useCallback } from 'react';
import { View, Text } from 'react-native';

import Comment from './components/Comment';
import CommentInput from './components/CommentInput';

import styles from './styles';

function CommentSection({ comments, onRefPress }) {
  const renderComment = useCallback(
    (item) => (
      <Comment
        key={item.comment_id.toString()}
        user={item.author}
        text={item.content}
        image={item.imageUrl || undefined}
        onRefPress={onRefPress}
      />
    ),
    [onRefPress]
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
