import React from 'react'
import { StyleSheet, Text, View ,Alert} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from "react-native-paper";
import UploadImages from "./UploadImages.js";
export default class PicturePage extends React.Component {

    GaleridenSec = (cropit, circular = false, mediaType) => {
        ImagePicker.openPicker({
          width: 375,
          height: 635,
          cropperCircleOverlay: circular,
          sortOrder: 'none',
          compressImageMaxWidth: 375,
          compressImageMaxHeight: 635,
          compressImageQuality: 1,
          compressVideoPreset: 'MediumQuality',
          includeExif: true,
          cropperStatusBarColor: 'white',
          cropperToolbarColor: 'white',
          cropperActiveWidgetColor: 'white',
          cropperToolbarWidgetColor: '#3498DB',
        })
          .then((image) => {
           
            UploadImages(image.path,this.props.setImage,"Gallery")
    
          })
          .catch((e) => {
            Alert.alert("Resim Seçilmedi");
          });
         
      }
     render()
     {
        return (
            <View>
               <Button
              icon="library"
              onPress={() =>this.GaleridenSec()}
              mode="contained"
              style={{ width: "30%", marginTop: 10, top: 40,width:200 }}
            >
              Galeriden Seç
            </Button>
            </View>
        );
     }
    
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        marginTop: 20,
        paddingTop: 40,
        alignItems: "center",
      },
})
