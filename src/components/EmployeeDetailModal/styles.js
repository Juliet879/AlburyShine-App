import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      marginTop: 70,
      marginHorizontal:20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      // alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#276EF1",
      borderRadius: 10,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },

  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowRadius: 2,
		shadowOpacity: 0.5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
    borderBottomWidth:1
  },
  details: {
		paddingVertical: 10,
	},
  heading: {
		fontSize: 24,
		fontWeight: 'bold',
		paddingVertical: 20,
    color:"#276EF1"
	},
  bold:{
    fontWeight:"bold"
  }

  });
  export default styles