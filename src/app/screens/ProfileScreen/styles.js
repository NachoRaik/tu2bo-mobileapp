import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  scrollArea: {
    flex: 1,
    width: '100%'
  },
  detailContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 1,
    flex: 0,
    margin: 20,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9
  },
  user: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: {
    borderRadius: 50,
    height: 80,
    width: 80
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20
  },
  selected: {
    color: COLORS.main
  }
});

export default styles;
