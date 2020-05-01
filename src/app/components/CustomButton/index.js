import React from 'react';
import { string, func, bool } from 'prop-types';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import styles from './styles';

function CustomButton({ text, onPress, style, textStyle, disable, loading, loaderColor }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disable}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  text: string,
  onPress: func,
  disable: bool,
  loading: bool,
  loaderColor: string
};

export default CustomButton;
