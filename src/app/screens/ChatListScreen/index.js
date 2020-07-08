import React, { useState, useEffect, useCallback } from 'react';
import { Entypo } from '@expo/vector-icons';
import { GiftedAvatar } from 'react-native-gifted-chat';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { useSelector } from 'react-redux';

import { ROUTES } from '@constants/routes';
import { onNewChat, readMessage } from '@services/ChatService';
import { formatFirebaseTimestampInWords } from '@utils/date';

import NewChatButton from './components/NewChatButton';
import FriendsModal from './components/FriendsModal';

import { sortChats, shouldNotify } from './utils';
import styles from './styles';

function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const updateChats = useCallback((chat) => {
    setChats((prevChats) => {
      const copy = [...prevChats];
      const index = copy.findIndex(
        (c) => c.user.username === chat.user.username
      );
      if (index >= 0) {
        copy[index] = chat;
        return sortChats(copy);
      } else {
        return sortChats([...prevChats, chat]);
      }
    });
  }, []);

  useEffect(() => {
    const unsuscribe1 = onNewChat(
      (chat) => chat && updateChats(chat),
      'user1',
      me
    );

    const unsuscribe2 = onNewChat(
      (chat) => chat && updateChats(chat),
      'user2',
      me
    );

    return () => {
      unsuscribe1();
      unsuscribe2();
      setChats([]);
    };
  }, [me, updateChats]);

  const me = useSelector((state) => state.auth.currentUser);

  const onSelectChat = useCallback(
    (item) => {
      readMessage(item, me.id);
      navigateToChat(item.user);
    },
    [navigateToChat, me]
  );

  const navigateToChat = useCallback(
    (user) => {
      navigation.navigate(ROUTES.Chat, {
        user: { user_id: user.id, username: user.username }
      });
    },
    [navigation]
  );

  const onSelectFriend = useCallback(
    (user) => {
      navigateToChat(user);
      setOpenModal(false);
    },
    [navigateToChat]
  );

  const renderChat = useCallback(
    ({ item }) => (
      <TouchableOpacity style={styles.card} onPress={() => onSelectChat(item)}>
        <GiftedAvatar user={{ name: item.user.username }} />
        <View style={styles.chat}>
          <Text style={styles.title}>{item.user.username}</Text>
          {shouldNotify(item.lastMessage, me) && (
            <View style={styles.notfication} />
          )}
          <View style={styles.infoChat}>
            <Text
              style={[
                styles.message,
                shouldNotify(item.lastMessage, me) && styles.notify
              ]}
              numberOfLines={1}>
              {item.lastMessage.text}
            </Text>
            <Text style={styles.date}>
              {formatFirebaseTimestampInWords(item.lastMessage.createdAt)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [me, onSelectChat]
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.requestSeparator} />;
  }, []);

  const keyExtractor = useCallback((item) => item.user.id.toString(), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FriendsModal
        userId={me.id}
        visible={openModal}
        onFriendSelect={onSelectFriend}
        onClose={() => setOpenModal(false)}
      />
      <View style={styles.container}>
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
      </View>
      <NewChatButton onNewChat={() => setOpenModal(true)} />
    </SafeAreaView>
  );
}

export default ChatListScreen;
