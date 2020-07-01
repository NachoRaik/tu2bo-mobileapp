import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { GiftedAvatar } from 'react-native-gifted-chat';
import { Entypo } from '@expo/vector-icons';

import { COLORS } from '@constants/colors';
import { getFriends } from '@services/UserService';
import styles from './styles';

export default function FriendsModal({
  userId,
  visible,
  onFriendSelect,
  onClose
}) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFriends() {
      setLoading(true);
      const response = await getFriends(userId);
      if (response.ok) {
        setFriends(response.data);
        setLoading(false);
      }
    }
    fetchFriends();
  }, [userId]);

  const renderFriend = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onFriendSelect(item)}>
        <GiftedAvatar user={{ name: item.username }} />
        <View style={styles.friend}>
          <Text style={styles.title}>{item.username}</Text>
          <Text style={styles.message}>Disponible</Text>
        </View>
      </TouchableOpacity>
    ),
    [onFriendSelect]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  console.warn(loading);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.modalTitle}>Amigos</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.cancelButton}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.main} />
        ) : friends.length ? (
          <FlatList
            data={friends}
            renderItem={renderFriend}
            keyExtractor={keyExtractor}
          />
        ) : (
          <View style={styles.empty}>
            <Entypo name="add-user" size={24} color="black" />
            <Text style={styles.empty}>No tenes amigos :(</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}
