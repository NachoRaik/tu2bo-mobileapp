import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15
  },
  image: {
    borderRadius: 50,
    height: 45,
    marginRight: 15,
    width: 45
  },
  textContainer: {
    flex: 1
  },
  user: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 15,
    flex: 1,
    flexShrink: 1
  }
});

export default styles;
