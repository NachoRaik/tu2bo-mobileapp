import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, TextInput, Text } from 'react-native';

import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import { resetPassword } from '@services/AuthService';

import { validateEmail } from '@utils/email';

import styles from './styles';

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const emailValid = validateEmail(email);
  const disable = !emailValid;

  const onEmailSubmit = useCallback(async () => {
    setLoading(true);
    const response = await resetPassword(email);
    if (response.ok) {
      navigation.navigate(ROUTES.VerifyCode, { email });
    } else {
      //TODO: remove
      navigation.navigate(ROUTES.VerifyCode, { email });
      setError(response.data.reason);
    }
    setLoading(false);
  }, [email, navigation]);

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
        Para reiniciar tu contraseña ingresa tu email registrado y te enviaremos
        un código de verificación.
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

export default ForgotPasswordScreen;
