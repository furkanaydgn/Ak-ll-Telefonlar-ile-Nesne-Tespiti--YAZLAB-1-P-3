import { StyleSheet,} from 'react-native'
import storage from '@react-native-firebase/storage'
let gonder_uri;
const UploadImages = async (uri, setImage, isim) => {
    const uploadUri = uri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    try {
        await storage().ref(`images-${isim}/${filename}`).putFile(uploadUri)
       
        var deneme = await storage().ref(`images-${isim}/${filename}`).getDownloadURL().then(function (imageUri) {
            return imageUri;
        })
        gonder_uri = deneme;
        


    } catch (e) {
        console.log(e);
    }

    async function postData(url = "", data = {}) {
        
        console.log("data", data);
        const response = await fetch(url, {
          method: "POST",
          mode: "cors", 
          cache: "no-cache", 
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          redirect: "follow", 
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(data),
        });
        
        return response.json(); 
      }
   
    await postData("https://yazlab-server2.herokuapp.com/send-data", {
    answer: filename,
    option: isim,
    gonderilenUri: gonder_uri,
  }).then((response) => {
    console.log(JSON.stringify(response));
  });
   
  setTimeout(async () => {
  
    var deneme2 = await
      storage()
      .ref(filename)    
      .getDownloadURL()
      .then(function (imageUri) {
        return imageUri;
      });
    
    setImage(deneme2);
  }, 10000);

    
    
}
export default UploadImages;
const styles = StyleSheet.create({})
