import React, {useEffect, useState} from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import WebView from "react-native-webview";
import styles from "./styles";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import Pdf from "react-native-pdf";

// const writePdfToFile = async (base64String) => {
//     const pdfUri = FileSystem.documentDirectory + 'file.pdf';
//     await FileSystem.writeAsStringAsync(pdfUri, base64String, {
//       encoding: FileSystem.EncodingType.Base64,
//     });
//     return pdfUri;
//   };
  
//   const openPdf = async (pdfUri) => {
//     await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: false });
//   };
  
 

const Invoice = ({route})=>{
    const { invoice } = route.params;
     // Usage
     

    const pdfSource ='data:application/pdf;base64,' + invoice;
    const source = { uri: pdfSource, cache: true };
   return (
<View style={styles.container}>

<Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
   
</View>
   )
}
export default Invoice;