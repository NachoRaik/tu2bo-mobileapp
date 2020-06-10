import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import actionCreator from '@redux/auth/actions';

export default function LoginButton({ navigation }) {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    navigation.dispatch(StackActions.popToTop());
    dispatch(actionCreator.logout());
    navigation.navigate(ROUTES.Login);
  }, [navigation, dispatch]);

  return (
    <>
      <FontAwesome.Button
        name="sign-out"
        backgroundColor={COLORS.white}
        color={COLORS.main}
        size={30}
        onPress={onLogout}
      />
    </>
  );
}
