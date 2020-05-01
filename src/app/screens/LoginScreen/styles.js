import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.main
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 30
  },
  loginContainer: {
    flex: 1
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 20,
    padding: 5,
    width: 200
  },
  loginButton: {
    backgroundColor: COLORS.main,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: COLORS.white,
    marginBottom: 10
  },
  buttonDisable: {
    borderColor: COLORS.gray
  },
  loginButtonText: {
    color: COLORS.white
  },
  textDisable: {
    color: COLORS.gray
  }
});

export default styles;
