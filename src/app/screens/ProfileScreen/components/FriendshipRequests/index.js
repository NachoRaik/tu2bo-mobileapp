import React, { useCallback, useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Text
} from 'react-native';

import { COLORS } from '@constants/colors';
import { acceptFriendshipRequest } from '@services/UserService';

import styles from './styles';

function FriendShipRequests({ requests, loading }) {
  const renderRequest = useCallback(
    ({ item }) => (
      <View style={styles.videoCard}>
        <View style={styles.card}>
          <Text style={styles.title}>{item.username}</Text>
          <TouchableOpacity
            style={styles.acceptUser}
            onPress={() => acceptFriendshipRequest(item.id)}>
            <Text style={styles.buttonText}>ACEPTAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    ),
    []
  );

  const renderSeparator = useCallback(() => {
    return <View style={styles.requestSeparator} />;
  }, []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.main} />
      ) : requests.length ? (
        <FlatList
          data={requests}
          renderItem={renderRequest}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSeparator}
        />
      ) : (
        <View style={styles.empty}>
          <Entypo name="add-user" size={24} color="black" />
          <Text style={styles.empty}>No hay solicitudes de momento</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

export default FriendShipRequests;
