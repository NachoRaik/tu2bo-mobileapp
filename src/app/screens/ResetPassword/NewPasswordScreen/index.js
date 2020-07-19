import React, { useCallback, useState } from 'react';
import { View, SafeAreaView, TextInput, Text } from 'react-native';

import CustomButton from '@components/CustomButton';
import OkModal from '@components/OkModal';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import { newPassword } from '@services/AuthService';

import styles from './styles';

function NewPasswordScreen({ navigation, route }) {
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const email = route?.params?.email;
  const code = route?.params?.code;

  const disable = !password.length > 0 || password !== confirmPw;

  const onNewPasswordSubmit = useCallback(async () => {
    setLoading(true);
    const response = await newPassword(email, code, password);
    if (response.ok) {
      setOpenModal(true);
    } else {
      setError(response.data.reason);
    }
    setLoading(false);
  }, [email, code, password]);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
    onNavigateToLogin();
  }, [onNavigateToLogin]);

  const onNavigateToLogin = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.Login }]
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <OkModal
        text="Se cambió la contraseña correctamente"
        closeText="Volver a login"
        visible={openModal}
        onPress={onCloseModal}
      />
      <Text style={styles.title}>Nueva Contraseña</Text>
      <Text style={styles.explanation}>Ingresa la nueva contraseña</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          label="Password"
          placeholder="Nueva Contraseña"
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
          text="CAMBIAR CONTRASEÑA"
          style={[styles.loginButton, disable && styles.buttonDisable]}
          textStyle={disable ? styles.textDisable : styles.loginButtonText}
          onPress={onNewPasswordSubmit}
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

export default NewPasswordScreen;
