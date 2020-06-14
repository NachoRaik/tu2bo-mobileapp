import React, { useState } from 'react';
import { Text } from 'react-native';

import { commentSubtexts, convertToMiliseconds } from './utils';

import styles from './styles';

function CommentText({ text, onRefPress }) {
  const [subtexts] = useState(commentSubtexts(text));
  return (
    <Text style={styles.text}>
      {subtexts.map((subtext) =>
        subtext.isRef ? (
          <Text
            style={styles.commentRef}
            onPress={() => onRefPress(convertToMiliseconds(subtext.text))}>
            {subtext.text}
          </Text>
        ) : (
          subtext.text
        )
      )}
    </Text>
  );
}

export default CommentText;
