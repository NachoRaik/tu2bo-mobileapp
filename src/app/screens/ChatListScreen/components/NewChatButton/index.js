import React from 'react';
import { Entypo } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
import styles from './styles';

function NewChatButton({ onNewChat }) {
  return (
    <TouchableOpacity onPress={onNewChat} style={styles.button}>
      <Entypo name="new-message" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default NewChatButton;
