import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import { COLORS } from '@constants/colors';

import styles from './styles';

export default function TabBarIcon({ name, focused }) {
  return (
    <Ionicons
      name={name}
      size={30}
      style={styles.icon}
      color={focused ? COLORS.main : COLORS.gray}
    />
  );
}
