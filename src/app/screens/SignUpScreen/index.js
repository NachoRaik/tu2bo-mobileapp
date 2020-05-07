import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, TextInput, Text } from 'react-native';

import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';

import { validateEmail } from '@utils/email';

import styles from './styles';

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const emailValid = validateEmail(email);
  const passwordValid = password.length > 0;
  const disable = !emailValid || !passwordValid || password !== confirmPw;

  const onSubmit = useCallback(() => {
    navigation.navigate(ROUTES.Login);
    setEmail('');
    setPassword('');
    setConfirmPw('');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tu2bo</Text>
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
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPw}
          value={confirmPw}
          label="Confirm Password"
          placeholder="Confirmar Contraseña"
          secureTextEntry
        />
        <CustomButton
          text="REGISTRARSE"
          style={[styles.loginButton, disable && styles.buttonDisable]}
          textStyle={disable ? styles.textDisable : styles.loginButtonText}
          onPress={onSubmit}
          disable={disable}
        />
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;
