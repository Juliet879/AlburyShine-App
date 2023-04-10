import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cards:{
        color:"#ffffff",
        fontSize:24,
    },
    cardSub:{
        color:"#ffffff",
        fontSize:13,
    },
    icons:{
        color:"#000000",
        backgroundColor:"#ffffff"
    },
    completed:{
        backgroundColor:"#01B5B4",
        borderRadius:5,
        width:"45%"
    },
    incomplete:{
        backgroundColor:"#FF2971",
        width:"45%",
        borderRadius:5
    },
    inprogress:{
        backgroundColor:"orange",
        width:"45%",
        borderRadius:5,
        marginVertical:5
    },
    title:{
        color:"#000000",
        fontSize:18,
        textAlign:"center",
        fontWeight:"bold",
        marginVertical:10
    },
    container: {
        flexDirection: "row",
        justifyContent:"space-between",
        padding: 10,
        marginBottom: 10,      
        borderBottomWidth:1
      },
      heading: {
		fontSize: 24,
		fontWeight: 'bold',
		paddingVertical: 20,
	},
    taskDelete:{
        color:"#000000",
        backgroundColor:"transparent"

    },
    activity:{
        marginVertical:65
    },
    activityText:{
        textAlign:"center",
        color:"#276EF1"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:"#276EF1",
      },
      chipStatus:{
        backgroundColor:"transparent"
      }


      

})

export default styles