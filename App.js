import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity  } from 'react-native';
import {Camera} from "expo-camera";




export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera,setCamera] = useState(null)
  const [photo,setPhoto] = useState(null)


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    const takePhoto = async () =>{
        const photo = await camera.takePictureAsync(
        { quality: 1, base64: true, fixOrientation: true,
            exif: true}
        )
        setPhoto(photo.uri)

    }

  return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}  ref={setCamera}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={takePhoto}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
            {photo &&
            <View style={styles.photoContainer}>
                <Image source={{uri: photo}} style={styles.photo} />
            </View>
            }
        </Camera>
      </View>
  );
}


const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    camera:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#000',
        fontSize: 24
    },
    photoContainer:{
        position: 'absolute',
        left: 15,
        top: 50,
        width: 146,
        height: 194,
        borderColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    photo: {
        width: 144,
        height: 192
    }
})



