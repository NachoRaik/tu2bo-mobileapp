import React, { useEffect, useCallback, useState } from 'react';
import moment from 'moment';
import {
  ScrollView,
  SafeAreaView,
  TextInput,
  View,
  Text,
  Picker,
  Image,
  ActivityIndicator
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import IconButton from '@components/IconButton';
import OkModal from '@components/OkModal';
import CustomButton from '@components/CustomButton';
import { ROUTES } from '@constants/routes';
import { COLORS } from '@constants/colors';
import actionCreator from '@redux/users/actions';

import styles from './styles';
import { uploadToFirebase } from './utils';
import { VISIBILITYS } from './constants';

console.disableYellowBox = true;

function UploadVideoScreen({ navigation }) {
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uri, setUri] = useState('');
  const [visibility, setVisibility] = useState(VISIBILITYS[0].value);
  const [thumbnail, setThumb] = useState('');
  const [thumbLoading, setThumbLoading] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    Permissions.getAsync(Permissions.CAMERA_ROLL);
    Permissions.getAsync(Permissions.CAMERA);
  });

  const generateThumbnail = useCallback(async (videoUri) => {
    try {
      setThumbLoading(true);
      const { uri: image } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 150
      });
      const thumbUrl = await uploadToFirebase(image, 'thumb');
      setThumb(thumbUrl);
    } catch (e) {
      console.warn(e);
    } finally {
      setThumbLoading(false);
    }
  }, []);

  const handleSubmitVideo = useCallback(async () => {
    try {
      const date = moment().format('MM/DD/YY HH:mm:ss');
      setTimestamp(date);
      setUploading(true);
      const uploadUrl = await uploadToFirebase(uri, 'video');
      setVideoUrl(uploadUrl);
      dispatch(
        actionCreator.uploadVideo(user.id, {
          url: uploadUrl,
          author: user.username,
          title: title,
          visibility: visibility,
          user_id: user.id,
          description: description,
          thumb: thumbnail,
          date: date
        })
      );
      setOpenModal(true);
    } catch (e) {
      console.warn(e);
      setError('Algo falló mientras se subia el video');
    } finally {
      setUploading(false);
    }
  }, [uri, dispatch, thumbnail, user, title, visibility, description]);

  const filmVideo = useCallback(async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Videos'
    });
    if (!pickerResult.cancelled) {
      //dispatcheo la action
      setUri(pickerResult.uri);
      generateThumbnail(pickerResult.uri);
    }
  }, [generateThumbnail]);

  const pickVideo = useCallback(async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Videos'
    });

    if (!pickerResult.cancelled) {
      //dispatcheo la action
      setUri(pickerResult.uri);
      generateThumbnail(pickerResult.uri);
    }
  }, [generateThumbnail]);

  const onCloseModal = useCallback(() => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(ROUTES.VideoScreen, {
      video: {
        url: videoUrl,
        title: title,
        description: description,
        author: user?.username,
        date: timestamp
      }
    });
    setOpenModal(false);
  }, [navigation, videoUrl, title, user, timestamp, description]);

  const disable = !uri || !title;

  return (
    <SafeAreaView style={styles.container}>
      <OkModal
        visible={openModal}
        text="Se subió el video correctamente"
        closeText="Ver mis videos"
        onPress={onCloseModal}
      />
      <ScrollView contentContainerStyle={styles.scrollArea}>
        {uri ? (
          <>
            {thumbLoading || !thumbnail ? (
              <ActivityIndicator />
            ) : (
              <Image source={{ uri: thumbnail }} style={styles.thumb} />
            )}
            <View style={styles.attachment}>
              <Entypo name="attachment" size={25} color="green" />
              <Text>Video Adjunto</Text>
            </View>
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
        <View style={styles.visPicker}>
          <Picker
            selectedValue={visibility}
            onValueChange={(itemValue) => setVisibility(itemValue)}>
            {VISIBILITYS.map((v) => (
              <Picker.Item key={v.value} label={v.name} value={v.value} />
            ))}
          </Picker>
        </View>

        <CustomButton
          text="SUBIR"
          style={[styles.uploadButton, disable && styles.buttonDisable]}
          textStyle={disable ? styles.textDisable : styles.uploadButtonText}
          onPress={handleSubmitVideo}
          disable={disable}
          loading={uploading}
          loaderColor={COLORS.white}
        />
        {uploading && (
          <Text>El video puede tardar unos minutos en subir...</Text>
        )}
        {error && <Text>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

export default UploadVideoScreen;
