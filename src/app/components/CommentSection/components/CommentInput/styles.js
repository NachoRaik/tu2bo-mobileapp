import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 1,
    marginTop: 0,
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default styles;
