import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, Text } from 'react-native';

import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import { verifyCode } from '@services/AuthService';

import styles from './styles';
import CodeInput from './components/CodeInput';

function VerifyCodeScreen({ navigation, route }) {
  const [email] = useState(route?.params?.email);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const disable = !code || code?.length < 4;

  const onCodeSubmit = useCallback(async () => {
    setLoading(true);
    const response = await verifyCode(email, code);
    if (response.ok) {
      //navigate? o change input
      navigation.navigate(ROUTES.NewPassword, { email, code });
    } else {
      //TODO: Remove
      navigation.navigate(ROUTES.NewPassword, { email, code });
      setError(response.data.reason);
    }
    setLoading(false);
  }, [email, code, navigation]);

  const onNavigateToLogin = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.Login }]
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Verificar Código</Text>
      <Text style={styles.explanation}>
        Chequea tu casilla de mails e ingresa el código de verificación que te
        enviamos
      </Text>
      <View>
        <CodeInput value={code} setValue={setCode} />
        <CustomButton
          text="CONFIRMAR"
          style={[styles.loginButton, disable && styles.buttonDisable]}
          textStyle={disable ? styles.textDisable : styles.loginButtonText}
          onPress={onCodeSubmit}
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

export default VerifyCodeScreen;
