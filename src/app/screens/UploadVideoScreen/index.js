import React, { useEffect, useCallback, useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';

import IconButton from '@components/IconButton';
import OkModal from '@components/OkModal';
import { ROUTES } from '@constants/routes';

import styles from './styles';
import { uploadImageAsync } from './utils';

function UploadVideoScreen({ navigation }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uri, setUri] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    Permissions.getAsync(Permissions.CAMERA_ROLL);
    Permissions.getAsync(Permissions.CAMERA);
  });

  const handleSubmitVideo = useCallback(async () => {
    try {
      setUploading(true);
      const uploadUrl = await uploadImageAsync(uri, 1);
      setImageUrl(uploadUrl); //{url, desc, title} then goes to media server
    } catch (e) {
      console.warn(e);
      console.warn('Upload failed, sorry :(');
    } finally {
      setUploading(false);
      setOpenModal(true);
    }
  }, [uri]);

  const filmVideo = useCallback(async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Videos'
    });
    if (!pickerResult.cancelled) {
      //dispatcheo la action
      setUri(pickerResult.uri);
    }
  }, []);

  const pickVideo = useCallback(async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Videos'
    });

    if (!pickerResult.cancelled) {
      //dispatcheo la action
      setUri(pickerResult.uri);
    }
  }, []);

  const onCloseModal = useCallback(() => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(ROUTES.Profile);
    setOpenModal(false);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <OkModal
        visible={openModal}
        text="Se subió el video correctamente"
        closeText="Ver mis videos"
        onPress={onCloseModal}
      />
      {uri ? (
        <>
          <Entypo name="attachment" size={30} color="green" />
          <Text>Video Adjunto</Text>
        </>
      ) : (
        <View style={styles.uploadButtons}>
          <IconButton
            name="video-camera"
            onPress={() => filmVideo()}
            text="Grabar video"
          />
          <IconButton
            name="folder-video"
            onPress={() => pickVideo()}
            text="Seleccionar video"
          />
        </View>
      )}
      <TextInput
        style={styles.titleInput}
        onChangeText={setTitle}
        value={title}
        placeholder="Titulo"
      />
      <TextInput
        style={styles.descInput}
        onChangeText={setDescription}
        value={description}
        placeholder="Escribe una breve descripcion..."
        dataDetectorTypes="all"
        multiline
      />
      {uploading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Button title="Subir" onPress={handleSubmitVideo} />
      )}
    </SafeAreaView>
  );
}

export default UploadVideoScreen;
