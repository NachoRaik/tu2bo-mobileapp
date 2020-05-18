import React, { useCallback, useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import actionCreator from '@redux/auth/actions';

//import { validateEmail } from '@utils/email';

import styles from './styles';

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const emailValid = true; //validateEmail(email);
  const passwordValid = password.length > 0;
  const disable = !emailValid || !passwordValid;

  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const authLoading = useSelector((state) => state.login.loading);

  const onSubmit = useCallback(() => {
    dispatch(actionCreator.login(username, password));
  }, [dispatch, username, password]);

  useEffect(() => {
    if (token) {
      navigation.navigate(ROUTES.Home);
      setUsername('');
      setPassword('');
    }
  }, [token, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tu2bo</Text>
      <View styles={styles.loginContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          label="Email"
          placeholder="Email o username"
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
          loading={authLoading}
          loaderColor={COLORS.white}
        />
        <CustomButton
          text="UNIRSE"
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
          onPress={() => navigation.navigate(ROUTES.SignUp)}
          disable={authLoading}
        />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
