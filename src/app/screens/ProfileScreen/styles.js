import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    //backgroundColor: COLORS.grayLight,
    flex: 1,
    justifyContent: 'center'
    //paddingTop: 20
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
  friendRequestButton: {
    alignSelf: 'center',
    backgroundColor: COLORS.main,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.main,
    marginBottom: 10
  },
  buttonText: {
    color: COLORS.white
  }
});

export default styles;
