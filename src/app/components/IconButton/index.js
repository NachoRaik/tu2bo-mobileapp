import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, ActivityIndicator } from 'react-native';

function IconButton({ name, onPress, disable, loading, loaderColor }) {
  return (
    <TouchableOpacity
      //style={[styles.button, style]}
      onPress={onPress}
      disabled={disable}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <Entypo name={name} size={30} color={disable ? 'gray' : 'red'} />
      )}
    </TouchableOpacity>
  );
}

export default IconButton;
