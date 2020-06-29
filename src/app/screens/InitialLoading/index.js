import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView, ActivityIndicator, Text } from 'react-native';

import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import actionCreator from '@redux/auth/actions';

import { getSession } from '@services/AuthService';
import styles from './styles';

function InitialLoading({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    getSession().then(({ token, user }) => {
      if (token && user) {
        dispatch(actionCreator.saveCurrentSession({ token, user }));
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.Home }]
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.Login }]
        });
      }
    });
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tu2bo</Text>
      <ActivityIndicator size="large" color={COLORS.main} />
    </SafeAreaView>
  );
}

export default InitialLoading;
