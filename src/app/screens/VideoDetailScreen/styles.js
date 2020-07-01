import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  scrollArea: {
    //marginBottom: 10
  },
  videoPlayer: {
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  },
  videoInfo: {
    margin: 15
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    fontWeight: 'bold'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  delete: {
    backgroundColor: COLORS.main,
    borderRadius: 4,
    flexGrow: 1
  },
  deleteText: {
    color: COLORS.white
  },
  edit: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.main,
    borderRadius: 4,
    flexGrow: 1
  },
  editText: {
    color: COLORS.main
  }
});

export default styles;
