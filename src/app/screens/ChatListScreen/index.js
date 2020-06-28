import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { GiftedAvatar } from 'react-native-gifted-chat';
import moment from 'moment';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { useSelector } from 'react-redux';

import { ROUTES } from '@constants/routes';
import { onNewChat } from '@services/ChatService';

import styles from './styles';

function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const unsuscribe1 = onNewChat(
        (chat) => chat && setChats((prevChats) => [...prevChats, chat]),
        'user1',
        me
      );

      const unsuscribe2 = onNewChat(
        (chat) => chat && setChats((prevChats) => [...prevChats, chat]),
        'user2',
        me
      );

      return () => {
        unsuscribe1();
        unsuscribe2();
        setChats([]);
      };
    }, [me])
  );

  const me = useSelector((state) => state.auth.currentUser);

  navigation.setOptions({
    title: 'Chats'
  });

  const renderChat = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate(ROUTES.Chat, {
            user: { user_id: item.user.id, username: item.user.username }
          })
        }>
        <GiftedAvatar user={{ name: item.user.username }} />
        <View style={styles.chat}>
          <Text style={styles.title}>{item.user.username}</Text>
          <View style={styles.infoChat}>
            <Text style={styles.message} numberOfLines={1}>
              {item.lastMessage.text}
            </Text>
            <Text style={styles.date}>
              {moment(item.lastMessage.createdAt.toDate()).fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.requestSeparator} />;
  }, []);

  const keyExtractor = useCallback((item) => item.user.id.toString(), []);

  console.warn(chats);

  return (
    <SafeAreaView style={styles.container}>
      {chats.length ? (
        <FlatList
          data={chats}
          renderItem={renderChat}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSeparator}
        />
      ) : (
        <View style={styles.empty}>
          <Entypo name="chat" size={24} color="black" />
          <Text style={styles.empty}>No hay chats de momento</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default ChatListScreen;