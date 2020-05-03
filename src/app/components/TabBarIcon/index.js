import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import { COLORS } from '@constants/colors';

export default function TabBarIcon({ name, focused }) {
  return (
    <Ionicons
      name={name}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? COLORS.main : COLORS.gray}
    />
  );
}
