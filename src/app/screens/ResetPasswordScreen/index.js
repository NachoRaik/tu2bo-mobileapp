import React, { useCallback, useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Text, Image } from 'react-native';

import logo from '@assets/tutubo-03.png';
import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import { resetPassword } from '@services/UserService';

import { validateEmail } from '@utils/email';

import styles from './styles';

function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailValid = validateEmail(email);
  const disable = !emailValid;

  const onEmailSubmit = useCallback(async () => {
    setLoading(true);
    const response = await resetPassword(email);
    if (response.ok) {
      //navigate? o change input
    } else {
      setError(response.data.reason);
    }
    setLoading(false);
  }, [email]);

  const onNavigateToLogin = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.Login }]
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Olvidaste tu contraseña?</Text>
      <Text style={styles.explanation}>
        Para reiniciar tu constraseña ingresa tu email registrado y te
        enviaremos un código de verificación.
      </Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          label="Email"
          placeholder="Email"
          keyboardType="email-address"
        />
        <CustomButton
          text="ENVIAR CÓDIGO"
          style={[styles.loginButton, disable && styles.buttonDisable]}
          textStyle={disable ? styles.textDisable : styles.loginButtonText}
          onPress={onEmailSubmit}
          disable={disable}
          loading={loading}
          loaderColor={COLORS.white}
        />
        <CustomButton
          text="CANCELAR"
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
          onPress={onNavigateToLogin}
          disable={loading}
        />
      </View>
      {!!error && <Text>{error}</Text>}
    </SafeAreaView>
  );
}

export default ResetPasswordScreen;
