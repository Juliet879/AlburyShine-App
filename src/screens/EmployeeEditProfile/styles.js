import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
    minHeight: Math.round(Dimensions.get('window').height),
  },
  avatar: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "none",

  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "none",
  },

  image: {
    alignSelf: "center",
    marginBottom: "5%",
  },

  welcome: {
    color: "#124AA1",
    fontSize: 25,
    marginBottom: 20,
    paddingVertical: 40,
  },
  submit: {
    backgroundColor: "#276EF1",
    textDecorationStyle: "capitalized",
    marginVertical: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#276EF1',
    textDecorationStyle: "capitalized",
    marginVertical: 20,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: "#276EF1",
  },
  high: {
    backgroundColor: "#A0616A",
    textDecorationStyle: "capitalized",
    marginVertical: 20,
    paddingVertical: 5,
    // paddingHorizontal:10,
    borderRadius: 5,
  },
  medium: {
    backgroundColor: "#Fee181",
    textDecorationStyle: "capitalized",
    marginVertical: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  low: {
    backgroundColor: "#06c258",
    textDecorationStyle: "capitalized",
    marginVertical: 20,
    paddingVertical: 5,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: "#124AA1",
    textDecorationStyle: "capitalized",
    marginTop: 20,
    paddingVertical: 5,
    // width: '60%',
    // marginLeft:"20%"
  },
  lightButtonColor: {
    color: "#ffffff",
  },
  darkButtonColor: {
    color: "#ffffff",
  },
  password: {
    color: "#252524",
    alignSelf: "center",
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
  lightTextColor: {
    color: "#276EF1",
  },
  darkTextColor: {
    color: "#276EF1",
  },
  centeredView: {
    // height: '100%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.5)",

    // marginVertical: 'auto',
  },
  modalView: {
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    // height: '30%',
    width: "90%",
  },
  details: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  containerDetails: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",

    // justifyContent:"space-between"
  },
  title: {
    color: "#000000",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 10,
  },
  openButton: {
    backgroundColor: "#276EF1",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
