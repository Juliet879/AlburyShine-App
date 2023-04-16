import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:"#276EF1",
      },
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      userItem: {
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        width: "80%",
      },
      userName: {
        fontSize: 18,
      },
})
export default styles