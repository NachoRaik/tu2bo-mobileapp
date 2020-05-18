import React, { useCallback, useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import OkModal from '@components/OkModal';
import actionCreator from '@redux/auth/actions';

import styles from './styles';
import { infoValid } from './utils';

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const disable = infoValid(username, email, password, confirmPw);

  const dispatch = useDispatch();
  const registered = useSelector((state) => state.login.registered);
  const authLoading = useSelector((state) => state.login.loading);

  const onSubmit = useCallback(() => {
    dispatch(actionCreator.register({ email, username, password }));
  }, [dispatch, username, email, password]);

  useEffect(() => {
    if (registered) {
      setOpenModal(true);
      setEmail('');
      setUsername('');
      setPassword('');
    }
  }, [registered, navigation]);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
    navigation.navigate(ROUTES.Login);
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPw('');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <OkModal
        text="Se creó la cuenta correctamente"
        closeText="Volver a login"
        visible={openModal}
        onPress={onCloseModal}
      />
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
          onChangeText={setUsername}
          value={username}
          label="username"
          placeholder="Username"
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
          loading={authLoading}
          loaderColor={COLORS.white}
        />
      </View>
    </SafeAreaView>
  );
}

export default SignUpScreen;
