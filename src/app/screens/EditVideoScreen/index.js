import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  TextInput,
  View,
  Text,
  Picker
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import OkModal from '@components/OkModal';
import CustomButton from '@components/CustomButton';
import { COLORS } from '@constants/colors';
import { VISIBILITIES } from '@constants/fields';
import { editVideo } from '@services/VideoService';
import actionCreators from '@redux/videos/actions';

import styles from './styles';

function EditVideoScreen({ navigation, route }) {
  const dispatch = useDispatch();

  const { id, title, description, visibility } = route?.params?.video;
  const [uploading, setUploading] = useState(false);
  const [newTitle, setTitle] = useState(title);
  const [newDescription, setDescription] = useState(description);
  const [newVisibility, setVisibility] = useState(visibility);

  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmitVideo = useCallback(async () => {
    try {
      setUploading(true);
      const response = await editVideo(id, {
        title: newTitle,
        visibility: newVisibility,
        description: newDescription
      });
      if (response.ok) {
        setOpenModal(true);
        setUploading(false);
      } else {
        setError(response.data.reason);
        setUploading(false);
      }
    } catch (e) {
      console.warn(e);
      setError('Algo falló mientras se subia el video');
    }
  }, [id, newTitle, newVisibility, newDescription]);

  const onCloseModal = useCallback(() => {
    navigation.dispatch(StackActions.pop());
    dispatch(actionCreators.getVideos());
    setOpenModal(false);
  }, [navigation, dispatch]);

  const disable = !title;

  return (
    <SafeAreaView style={styles.container}>
      <OkModal
        visible={openModal}
        text="Se editó el video correctamente"
        closeText="Ver video"
        onPress={onCloseModal}
      />
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <TextInput
          style={styles.titleInput}
          onChangeText={setTitle}
          value={newTitle}
          placeholder="Titulo"
          editable={!uploading}
        />
        <TextInput
          style={styles.descInput}
          onChangeText={setDescription}
          value={newDescription}
          placeholder="Escribe una breve descripcion..."
          dataDetectorTypes="all"
          editable={!uploading}
          multiline
        />
        <View style={styles.visPicker}>
          <Picker
            selectedValue={newVisibility}
            onValueChange={(itemValue) => setVisibility(itemValue)}
            enabled={!uploading}>
            {VISIBILITIES.map((v) => (
              <Picker.Item key={v.value} label={v.name} value={v.value} />
            ))}
          </Picker>
        </View>

        <CustomButton
          text="EDITAR"
          style={[styles.uploadButton, disable && styles.buttonDisable]}
          textStyle={disable ? styles.textDisable : styles.uploadButtonText}
          onPress={handleSubmitVideo}
          disable={disable}
          loading={uploading}
          loaderColor={COLORS.white}
        />
        {error && <Text style={{ marginVertical: 5 }}>{error}</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditVideoScreen;
