import React, { useState, useCallback } from 'react';
import CustomButton from '@components/CustomButton';

import styles from './styles';

function StatusButton({ onRequest, onAccept, onStartChat, status }) {
  const [statusInfo] = useState({
    'no-friends': {
      text: 'Enviar solicitud de amistad',
      disable: false,
      clickFunction: onRequest,
      nextStatus: 'pending'
    },
    pending: {
      text: 'Esperando respuesta',
      disable: true,
      clickFunction: null,
      nextStatus: 'friends'
    },
    friends: {
      text: 'Enviar mensaje',
      disable: false,
      clickFunction: onStartChat,
      nextStatus: 'friends'
    },
    'waiting-acceptance': {
      text: 'Aceptar solicitud',
      disable: false,
      clickFunction: onAccept,
      nextStatus: 'friends'
    }
  });
  const [currentStatus, setCurrentStatus] = useState(status);

  const onClick = useCallback(() => {
    statusInfo[status].clickFunction();
    setCurrentStatus(statusInfo[status].nextStatus);
  }, [status, statusInfo]);

  return (
    <CustomButton
      text={statusInfo[currentStatus].text}
      style={[
        styles.friendRequestButton,
        statusInfo[currentStatus].disable && styles.requestedButton
      ]}
      textStyle={[
        styles.buttonText,
        statusInfo[currentStatus].disable && styles.requestedText
      ]}
      onPress={onClick}
      disable={statusInfo[currentStatus].disable}
    />
  );
}

export default StatusButton;
