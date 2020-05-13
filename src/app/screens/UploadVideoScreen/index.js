import React, { useEffect, useCallback, useState } from 'react';
import { SafeAreaView, TextInput, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';
import { uploadImageAsync } from './utils';

function UploadVideoScreen() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    Permissions.getAsync(Permissions.CAMERA_ROLL);
    Permissions.getAsync(Permissions.CAMERA);
  });

  const handleImagePicked = useCallback(async (pickerResult) => {
    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImageUrl(uploadUrl);
        console.warn(uploadUrl);
      }
    } catch (e) {
      console.warn(e);
      console.warn('Upload failed, sorry :(');
    } finally {
      setUploading(false);
    }
  }, []);

  const filmVideo = useCallback(async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Videos'
    });

    handleImagePicked(pickerResult, 1);
  }, [handleImagePicked]);

  const pickVideo = useCallback(async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Videos'
    });

    handleImagePicked(pickerResult, 1);
  }, [handleImagePicked]);

  return (
    <SafeAreaView style={styles.container}>
      {!uploading && !imageUrl && (
        <>
          <Button title="filma!" onPress={() => filmVideo()} />
          <Button title="videograbado!" onPress={() => pickVideo()} />
        </>
      )}
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Titulo"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Descripción"
      />
      <Button title="Subir!" onPress={() => null} />
    </SafeAreaView>
  );
}

export default UploadVideoScreen;
