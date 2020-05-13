import React, { useEffect, useCallback, useState } from 'react';
import { SafeAreaView, TextInput, Button, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import IconButton from '@components/IconButton';

import styles from './styles';
import { uploadImageAsync } from './utils';

function UploadVideoScreen() {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selection, setSelection] = useState('');
  const [uri, setUri] = useState('');

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

  const handleSelection = useCallback((category, getVideo) => {
    setSelection(category);
    getVideo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.uploadButtons}>
        <IconButton
          name="video-camera"
          onPress={() => handleSelection('film', filmVideo)}
          disable={uploading || !!imageUrl}
          loading={uploading && selection === 'film'}
        />
        <IconButton
          name="folder-video"
          onPress={() => handleSelection('upload', pickVideo)}
          disable={uploading || !!imageUrl}
          loading={uploading && selection === 'upload'}
        />
      </View>
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
      <Button title="Subir" onPress={handleSubmitVideo} />
    </SafeAreaView>
  );
}

export default UploadVideoScreen;
