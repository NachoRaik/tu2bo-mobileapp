import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import { useSelector } from 'react-redux';

function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);

  const { username, user_id } = route?.params?.user;

  const me = useSelector((state) => state.auth.currentUser);

  navigation.setOptions({
    title: username
  });

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: user_id,
          name: username
        }
      }
    ]);
  }, [user_id, username]);

  const onSend = useCallback((msgs = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, msgs)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(msgs) => onSend(msgs)}
      user={{
        _id: me.user_id,
        name: me.username
      }}
    />
  );
}

export default ChatScreen;
