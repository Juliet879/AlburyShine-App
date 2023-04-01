import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 8,
      },
      headerText: {
        flex: 1,
        fontWeight: 'bold',
        width:80,
        color:"#276EF1"
      },
      row: {
        flexDirection: 'row',
        marginTop: 8,
        borderBottomWidth:1,
        
      },
      cell: {
        flex: 1,
        width:20
      },

})
export default styles