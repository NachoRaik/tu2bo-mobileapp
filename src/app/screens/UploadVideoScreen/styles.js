import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%'
  },
  titleInput: {
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 20,
    padding: 5,
    width: '90%'
  },
  descInput: {
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    padding: 5,
    width: '90%',
    height: 150,
    textAlignVertical: 'top'
  },
  uploadButton: {
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
  uploadButtonText: {
    color: COLORS.white
  },
  textDisable: {
    color: COLORS.white
  }
});

export default styles;
