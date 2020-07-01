import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 5,
    elevation: 1,
    margin: 20,
    marginVertical: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.9,
    flex: 1
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 40,
    marginTop: 10
  },
  cancelButton: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 40,
    marginTop: 15,
    color: COLORS.main
  },
  videoCard: {
    minWidth: '100%'
  },
  card: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '100%'
  },
  chat: {
    flexGrow: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  message: {
    paddingHorizontal: 10,
    color: COLORS.gray,
    width: 120
  },
  date: {
    color: COLORS.gray,
    alignSelf: 'flex-end'
  },
  infoChat: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    flex: 1
  },
  empty: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    fontWeight: 'bold'
  },
  requestSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
    paddingHorizontal: 20
  }
});

export default styles;
