import React from 'react';
import { Bubble } from 'react-native-gifted-chat';

import { COLORS } from '@constants/colors';

export const renderBubble = (props) => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: { backgroundColor: COLORS.main },
      left: {
        elevation: 1,
        flex: 0,
        shadowColor: COLORS.black,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.9
      }
    }}
  />
);
