import React, { useCallback } from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';

export default function UserButton({ navigation }) {
  const navigateToProfile = useCallback(
    () => navigation.navigate(ROUTES.Profile),
    [navigation]
  );

  const navigateToUploadVideo = useCallback(
    () => navigation.navigate(ROUTES.UploadVideo),
    [navigation]
  );

  return (
    <>
      <FontAwesome.Button
        name="plus-circle"
        backgroundColor={COLORS.white}
        color={COLORS.main}
        size={30}
        onPress={navigateToUploadVideo}
      />
      <FontAwesome.Button
        name="user"
        backgroundColor={COLORS.white}
        color={COLORS.main}
        size={30}
        onPress={navigateToProfile}
      />
    </>
  );
}
