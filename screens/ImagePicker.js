import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

import { GlobalStyles } from "../constants/styles";
import OutlinedButton from "../components/UI/OutlinedButton";

function ImagePicker() {
  const [pickedImages, setPickedImages] = useState([]);

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  // functie die eerste toegang vraagt, en als je geen toegang geeft krijg je een alert
  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
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

    setPickedImages((prevPickedImages) => [
      ...prevPickedImages,
      { uri: image.assets[0].uri, text: "" },
    ]);
  }

  // functie die de foto's weghaalt als je er op klikt
  function removeImageHandler(index) {
    Alert.alert(
      "Delete Image",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPickedImages((prevPickedImages) => {
              const newPickedImages = [...prevPickedImages];
              newPickedImages.splice(index, 1);
              return newPickedImages;
            });
          },
        },
      ],
      { cancelable: true }
    );
  }

  function onTextChangeHandler(index, text) {
    setPickedImages((prevPickedImages) => {
      const newPickedImages = [...prevPickedImages];
      newPickedImages[index] = { ...newPickedImages[index], text };
      return newPickedImages;
    });
  }

  let imagePreview = <Text>No images taken yet.</Text>;

  if (pickedImages.length > 0) {
    imagePreview = pickedImages.map((image, index) => (
      <View key={image.uri} style={styles.imageContainer}>
        <TouchableOpacity onPress={() => removeImageHandler(index)}>
          <Image style={styles.image} source={{ uri: image.uri }} />
        </TouchableOpacity>
        <TextInput
          style={styles.imageTextInput}
          placeholder="Enter description"
          value={image.text}
          onChangeText={(text) => onTextChangeHandler(index, text)}
        />
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View></View>
        <OutlinedButton style={styles.button} onPress={takeImageHandler}>
          Take Image
        </OutlinedButton>
        {imagePreview}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.backgroundColor,
    padding: 20,
  },
  scrollViewContent: {
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 6,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  imageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageTextInput: {
    width: "100%",
    borderColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
});

export default ImagePicker;
