import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.main,
    marginBottom: 30
  }
});

export default styles;
