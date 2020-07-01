import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.main,
    borderRadius: 50,
    position: 'absolute',
    padding: 10,
    right: 15,
    bottom: 15,
    zIndex: 1,
    elevation: 1
  }
});

export default styles;
