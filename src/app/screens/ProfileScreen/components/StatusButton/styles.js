import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  friendRequestButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.main,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.main,
    marginBottom: 10
  },
  requestedButton: {
    backgroundColor: COLORS.white
  },
  buttonText: {
    color: COLORS.white
  },
  requestedText: {
    color: COLORS.main
  }
});

export default styles;
