import { Alert, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { useState } from 'react';

import { GlobalStyles } from '../constants/styles';
import OutlinedButton from '../components/UI/OutlinedButton';


function ImagePicker() {
  const [pickedImages, setPickedImages] = useState([]);

  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();


  // functie die eerste toegang vraagt, en als je geen toegang geeft krijg je een alert
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImages((prevPickedImages) => [...prevPickedImages, image.uri]);
  }

  // functie die de foto's weghaalt als je er op klikt
  function removeImageHandler(index) {
    setPickedImages((prevPickedImages) => {
      const newPickedImages = [...prevPickedImages];
      newPickedImages.splice(index, 1);
      return newPickedImages;
    });
  }

  let imagePreview = <Text>No images taken yet.</Text>;

  if (pickedImages.length > 0) {
    imagePreview = pickedImages.map((uri, index) => (
      <TouchableOpacity key={uri} onPress={() => removeImageHandler(index)}>
        <Image style={styles.image} source={{ uri }} />
      </TouchableOpacity>
    ));
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imagePreview}>{imagePreview}</View>
      </ScrollView>
      <OutlinedButton icon="camera" onPress={takeImageHandler} style={styles.button}>
        Take a picture
      </OutlinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 350,
    height: 350,
    margin: 5,
  },
  button: {
    marginBottom: 20,
  },
});

export default ImagePicker;
