import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  title: {
    fontSize: 28,
    color: COLORS.main
  },
  explanation: {
    margin: 30,
    marginTop: 10,
    textAlign: 'center',
    color: COLORS.gray
  },
  loginButton: {
    backgroundColor: COLORS.main,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: COLORS.main,
    marginBottom: 10
  },
  buttonDisable: {
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray
  },
  loginButtonText: {
    color: COLORS.white
  },
  textDisable: {
    color: COLORS.white
  }
});

export default styles;
