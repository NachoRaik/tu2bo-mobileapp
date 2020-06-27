import React from 'react';
import { Send, Composer } from 'react-native-gifted-chat';

import { COLORS } from '@constants/colors';

export const renderSend = (props) => (
  <Send {...props} label="Enviar" textStyle={{ color: COLORS.main }} />
);

export const renderComposer = (props) => (
  <Composer {...props} placeholder="Escribe un mensaje..." />
);
