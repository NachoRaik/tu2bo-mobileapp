import React, { useEffect, useCallback, useState } from 'react';
import { SafeAreaView, TextInput, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import IconButton from '@components/IconButton';
import OkModal from '@components/OkModal';
import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';

import styles from './styles';
import { uploadVideoToFirebase } from './utils';

function UploadVideoScreen({ navigation }) {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uri, setUri] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    Permissions.getAsync(Permissions.CAMERA_ROLL);
    Permissions.getAsync(Permissions.CAMERA);
  });

  const handleSubmitVideo = useCallback(async () => {
    try {
      setUploading(true);
      const uploadUrl = await uploadVideoToFirebase(uri, 1);
      setVideoUrl(uploadUrl); //{url, desc, title} then goes to media server
      setOpenModal(true);
    } catch (e) {
      console.warn(e);
      console.warn('Upload failed, sorry :(');
    } finally {
      setUploading(false);
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
    navigation.navigate(ROUTES.VideoScreen, {
      video: {
        url: videoUrl,
        title: title,
        description: description,
        author: user?.username
      }
    });
    setOpenModal(false);
  }, [navigation, videoUrl, title, user, description]);

  const disable = !uri || !title;

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
      <CustomButton
        text="SUBIR"
        style={[styles.uploadButton, disable && styles.buttonDisable]}
        textStyle={disable ? styles.textDisable : styles.uploadButtonText}
        onPress={handleSubmitVideo}
        disable={disable}
        loading={uploading}
        loaderColor={COLORS.white}
      />
      {uploading && <Text>El video puede tardar unos minutos en subir...</Text>}
    </SafeAreaView>
  );
}

export default UploadVideoScreen;
