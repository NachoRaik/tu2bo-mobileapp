import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  count: {
    fontSize: 14,
    alignSelf: 'center',
    marginHorizontal: 5,
    color: COLORS.main,
    paddingBottom: 5
  }
});

export default styles;
