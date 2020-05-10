import React from 'react';
import { Modal, Text, View, Image, Button } from 'react-native';

import check from '@assets/check.gif';
import { COLORS } from '@constants/colors';
import styles from './styles';

export default function OkModal({ visible, onPress }) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onPress}>
      <View style={styles.container}>
        <Image style={styles.gif} source={check} />
        <Text style={styles.title}>Se creó la cuenta exitosamente!</Text>
      </View>
      <Button
        style={styles.button}
        onPress={onPress}
        title="Volver al Login"
        color={COLORS.main}
      />
    </Modal>
  );
}
