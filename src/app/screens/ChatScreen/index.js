import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';

import { on, sendMessages } from '@services/ChatService';

import { renderBubble } from './components/CustomBubble';
import { renderSend, renderComposer } from './components/CustomInput';

function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);

  const { username, user_id } = route?.params?.user;

  const me = useSelector((state) => state.auth.currentUser);

  navigation.setOptions({
    title: username
  });

  useEffect(() => {
    const unsuscribe = on(
      (message) =>
        message && setMessages((msgs) => GiftedChat.append(msgs, message)),
      me.id,
      user_id
    );

    return () => {
      unsuscribe();
    };
  }, [me, user_id]);

  const onSend = useCallback(
    (msgs = []) => {
      sendMessages(
        msgs,
        { username: me.username, id: me.id },
        { username, id: user_id }
      );
    },
    [me, username, user_id]
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(msgs) => onSend(msgs)}
      user={{
        _id: parseInt(me.id, 10),
        name: me.username
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      renderComposer={renderComposer}
    />
  );
}

export default ChatScreen;
