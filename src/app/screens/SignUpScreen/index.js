import React, { useCallback, useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '@assets/tutubo-03.png';
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
  const registered = useSelector((state) => state.auth.registered);
  const authLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const onSubmit = useCallback(() => {
    dispatch(actionCreator.register({ email, username, password }));
  }, [dispatch, username, email, password]);

  const cleanForm = useCallback(() => {
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPw('');
  }, []);

  useEffect(() => {
    if (registered) {
      setOpenModal(true);
      cleanForm();
    }
  }, [registered, cleanForm, navigation]);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
    navigation.navigate(ROUTES.Login);
    dispatch(actionCreator.cleanState());
  }, [navigation, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <OkModal
        text="Se creó la cuenta correctamente"
        closeText="Volver a login"
        visible={openModal}
        onPress={onCloseModal}
      />
      <Image style={styles.logo} source={logo} resizeMode="contain" />
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
      {error && <Text>{error}</Text>}
    </SafeAreaView>
  );
}

export default SignUpScreen;
