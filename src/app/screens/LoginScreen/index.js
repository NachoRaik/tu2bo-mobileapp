import React, { useCallback, useState } from "react";
import { View, SafeAreaView, TextInput, Text } from "react-native";

import CustomButton from "@components/CustomButton";
import { ROUTES } from "@constants/routes";

import { validateEmail } from "./utils";

import styles from "./styles";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailValid = validateEmail(email);
  const passwordValid = password.length > 0;
  const disable = !emailValid || !passwordValid;

  const onSubmit = useCallback(() => {
    navigation.navigate(ROUTES.Home);
    setEmail("");
    setPassword("");
  }, [email, password]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TU2BO</Text>
      <View styles={styles.loginContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          label="Email"
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          label="Password"
          placeholder="Contraseña"
          secureTextEntry
        />
        <CustomButton
          text="INGRESAR"
          style={[styles.loginButton, disable && styles.buttonDisable]}
          textStyle={disable ? styles.textDisable : styles.loginButtonText}
          onPress={onSubmit}
          disable={disable}
        />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
