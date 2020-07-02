import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, ActivityIndicator, Image } from 'react-native';

import logo from '@assets/tutubo-03.png';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import actionCreator from '@redux/auth/actions';

import { getSession } from '@services/AuthService';
import styles from './styles';

function InitialLoading({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    getSession().then(({ token, user }) => {
      let route = ROUTES.Login;
      if (token && user) {
        dispatch(actionCreator.saveCurrentSession({ token, user }));
        route = ROUTES.Home;
      }
      navigation.reset({
        index: 0,
        routes: [{ name: route }]
      });
    });
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} resizeMode="contain" />
      <ActivityIndicator size="large" color={COLORS.main} />
    </SafeAreaView>
  );
}

export default InitialLoading;
