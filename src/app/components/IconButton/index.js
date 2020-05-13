import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity, ActivityIndicator, Text, View } from 'react-native';

function IconButton({ name, onPress, disable, loading, loaderColor, text }) {
  return (
    <TouchableOpacity
      //style={[styles.button, style]}
      onPress={onPress}
      disabled={disable}>
      {loading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Entypo name={name} size={30} color={disable ? 'gray' : 'red'} />
          <Text>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default IconButton;
