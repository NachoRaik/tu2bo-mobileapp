import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { ROUTES } from '@constants/routes';

import styles from './styles';
import { onNewChat } from '../../../services/ChatService';

function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  const me = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const unsuscribe = onNewChat(
      (chat) => chat && setChats((prevChats) => [...prevChats, chat]),
      me
    );

    return () => {
      unsuscribe();
    };
  }, [me]);

  const renderChat = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={() =>
          navigation.navigate(ROUTES.Chat, {
            user: { user_id: item.id, username: item.username }
          })
        }>
        <Text>{item.username}</Text>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  console.warn(chats);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
}

export default ChatListScreen;
