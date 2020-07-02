import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  logo: {
    width: 250,
    marginBottom: 30
  },
  loginContainer: {
    flex: 1
  },
  input: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 5,
    width: 200
  },
  loginButton: {
    backgroundColor: COLORS.main,
    borderColor: COLORS.main,
    borderStyle: 'solid',
    borderWidth: 1,
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
