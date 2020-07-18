import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

export default StyleSheet.create({
  codeFieldRoot: {
    marginVertical: 20,
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1
  },
  cellText: {
    fontSize: 36,
    textAlign: 'center'
  },
  focusCell: {
    borderBottomColor: COLORS.main,
    borderBottomWidth: 2
  }
});
