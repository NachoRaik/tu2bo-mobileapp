import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesome } from '@expo/vector-icons';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import actionCreator from '@redux/auth/actions';

export default function LoginButton({ navigation }) {
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(actionCreator.logout());
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTES.Login }]
    });
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
