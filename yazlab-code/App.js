import React, { useState } from 'react';
import {Image, ImageBackground,View} from 'react-native'
import GlobalStyle from "./Styles.js";
import arkaplan2 from "./assets/arkaplan2.png";
import PicturePage from "./PicturePage.js";
import CameraModule from "./Camera.js";
const App = () => {
  const [image, setImage] = useState(null)

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={arkaplan2} style={GlobalStyle.container2}>
        <View
          style={{
            backgroundColor: "#eeee",
            width: 350,
            height: 350,
            left:-10,
            borderRadius: 20,
            marginBottom: 250,
          }}
        >
          <Image
            source={{ uri: image }}
            style={{
              left: 0,
              width: 375,
              height: 625,
              borderRadius: 10,
              marginTop: 0,

            }}
          />
        </View>
        <CameraModule setImage={setImage}/>
        
        <PicturePage setImage={setImage} />
        
      </ImageBackground>
    </View>

  );

};

export default App;