import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Text, Avatar, Image, Button } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";

const PhotoLibraryPicker = ({
  image,
  setImage,
  setImageBase64,
  avatarIcon,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const refRBSheet = useRef();

  const openCamera = async () => {
    setIsLoading(true);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      presentationStyle:
        ImagePicker.UIImagePickerPresentationStyle.BlurOverFullScreen,
      quality: 1,
      base64: true,
    });
    refRBSheet.current.close();
    applyResult(result);
  };

  const pickImage = async () => {
    setIsLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      presentationStyle:
        ImagePicker.UIImagePickerPresentationStyle.BlurOverFullScreen,
      quality: 1,
      base64: true,
    });
    refRBSheet.current.close();
    applyResult(result);
  };

  function applyResult(result) {
    if (!result.cancelled) {
      setImage(result.uri);
      setImageBase64(result.base64);
    }
    setIsLoading(false);
  }

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={360}
      >
        <View style={styles.panel}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Picture</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => refRBSheet.current.close()}
          >
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>

      <View style={{ display: "flex", alignItems: "center", margin: "5%" }}>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => refRBSheet.current.open()}
        >
          <Text style={styles.panelButtonTitle}>צירוף חשבונית / קבלה</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  changePasswordText: {
    color: "blue",
    margin: 5,
  },
  buttonStyle: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  containerStyle: {
    alignItems: "center",
    display: "flex",
    marginTop: "10%",
  },
  textStyle: {
    width: 280,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#2089dc",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});

export default PhotoLibraryPicker;
