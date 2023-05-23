import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import styles from "./styles";

import Pdf from "react-native-pdf";

const Invoice = ({ route }) => {
  const { invoice } = route.params;
  // Usage

  const pdfSource = "data:application/pdf;base64," + invoice;
  const source = { uri: pdfSource, cache: true };
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
        return numberOfPages
        }}
        onPageChanged={(page, numberOfPages) => {
          return page
        }}
        onError={(error) => {
          return error
        }}
        onPressLink={(uri) => {
          return uri
        }}
        style={styles.pdf}
      />
    </View>
  );
};
export default Invoice;
