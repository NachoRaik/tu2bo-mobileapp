import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 1,
    margin: 20,
    paddingHorizontal: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9
  },
  videoCard: {
    minWidth: '100%'
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: {
    height: 130,
    marginRight: 15,
    width: '100%'
  },
  textContainer: {
    flex: 1
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    fontWeight: 'bold'
  },
  acceptUser: {
    backgroundColor: COLORS.main,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    margin: 5
  },
  requestSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingHorizontal: 20
  }
});

export default styles;
