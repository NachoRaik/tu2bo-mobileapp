import React, { useState, useCallback } from 'react';
import CustomButton from '@components/CustomButton';

import styles from './styles';

function RequestFriendshipButton() {
  const [requested, setRequested] = useState(false);

  const onRequestFriendship = useCallback(() => {
    //TODO: Add request
    setRequested(true);
  }, []);

  return (
    <CustomButton
      text={requested ? 'Esperando respuesta' : 'Enviar solicitud de amistad'}
      style={[styles.friendRequestButton, requested && styles.requestedButton]}
      textStyle={[styles.buttonText, requested && styles.requestedText]}
      onPress={onRequestFriendship}
      disable={requested}
    />
  );
}

export default RequestFriendshipButton;
