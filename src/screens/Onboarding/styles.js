import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    subtitle: {
      color: "#8B8D90",
      fontSize: 13,
      marginTop: 10,
      maxWidth: '70%',
      textAlign: 'center',
      lineHeight: 23,
    },
    title: {
      color:"#276EF1",
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'center',
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    indicator: {
      height: 2.5,
      width: 10,
      backgroundColor: '#276EF1',
      marginHorizontal: 3,
      borderRadius: 2,
    },
    btn: {
      flex: 1,
      height: 50,
      borderRadius: 5,
      backgroundColor: '#276EF1',
      justifyContent: 'center',
      alignItems: 'center',
      color:"#FFFFFF"
    },
  });