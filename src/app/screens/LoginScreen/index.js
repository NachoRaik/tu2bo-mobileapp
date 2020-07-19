import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';

import logo from '@assets/tutubo-03.png';
import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import actionCreator from '@redux/auth/actions';

import { validateEmail } from '@utils/email';

import styles from './styles';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userLogged, setUser] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const emailValid = validateEmail(email);
  const passwordValid = password.length > 0;
  const disable = !emailValid || !passwordValid;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const authLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const onSubmit = useCallback(() => {
    dispatch(actionCreator.login(email, password));
  }, [dispatch, email, password]);

  const cleanLogin = useCallback(() => {
    dispatch(actionCreator.cleanState());
    setEmail('');
    setPassword('');
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setGoogleLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.Home }]
      });
      cleanLogin();
    }
  }, [token, cleanLogin, navigation]);

  useEffect(() => {
    initAsync();
  }, [initAsync]);

  const initAsync = useCallback(async () => {
    await GoogleSignIn.initAsync();
    _syncUserWithStateAsync();
  }, [_syncUserWithStateAsync]);

  const _syncUserWithStateAsync = useCallback(async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    dispatch(actionCreator.oauth(user.auth.idToken));
  }, []);

  const signInAsync = useCallback(async () => {
    try {
      setGoogleLoading(true);
      const { type } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        await _syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
      setGoogleLoading(false);
    }
  }, [_syncUserWithStateAsync]);

  const signOutAsync = useCallback(async () => {
    await GoogleSignIn.signOutAsync();
    setUser(null);
  }, []);

  const onPressLoginGoogle = useCallback(() => {
    signInAsync();
  }, [userLogged, signInAsync, signOutAsync]);

  const onNavigateToRegister = useCallback(() => {
    cleanLogin();
    navigation.navigate(ROUTES.SignUp);
  }, [navigation, cleanLogin]);

  const onNavigateToResetPassword = useCallback(() => {
    cleanLogin();
    navigation.navigate(ROUTES.ForgotPassword);
  }, [navigation, cleanLogin]);

  return (
    <SafeAreaView style={styles.container}>
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
          loading={authLoading && !googleLoading}
          loaderColor={COLORS.white}
        />
        <CustomButton
          text="UNIRSE"
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
          onPress={onNavigateToRegister}
          disable={authLoading}
        />
        <CustomButton
          text="INGRESAR CON GOOGLE"
          style={[styles.loginButton]}
          textStyle={disable ? styles.textDisable : styles.loginButtonText}
          onPress={onPressLoginGoogle}
          disable={authLoading && !googleLoading}
          loading={googleLoading}
          loaderColor={COLORS.white}
        />
        <TouchableOpacity onPress={onNavigateToResetPassword}>
          <Text style={styles.forgotPassword}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </SafeAreaView>
  );
}

export default LoginScreen;
