import React from 'react'
import { StyleSheet, View } from 'react-native'
import UploadImages from "./UploadImages.js";
import { Button } from "react-native-paper";
import ImagePicker from 'react-native-image-crop-picker';
const Camera = (props) => {
    const fotoCek = (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            width: 375,
            height: 635,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                UploadImages(image.path,props.setImage,"Camera")
            })
            .catch((e) => alert(e));
    }


    return (
        <View>
            <Button
                style={{ width: "30%", marginTop: 10, top: 40, width: 200 }}
                icon="camera"
                mode="contained"
                onPress={() => fotoCek(false)}
            >
                Camera
        </Button>
        </View>
    )
}

const styles = StyleSheet.create({})
export default Camera;