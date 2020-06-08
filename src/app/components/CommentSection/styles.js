import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  commentSection: {
    marginVertical: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  container: {
    //backgroundColor: COLORS.white,
    //borderRadius: 5,
    //elevation: 1,
    //margin: 20,
    marginTop: 0,
    padding: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9
  }
});

export default styles;
