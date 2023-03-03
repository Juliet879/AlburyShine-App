import React, {useState} from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    FlatList,
    TouchableOpacity,
    View,
    Card,
    Title,
    Paragraph,
    
  } from "react-native";
  import styles from "./style.js";
  import { Avatar, Divider , Checkbox} from 'react-native-paper';


const UserModal =({modalVisible,setModalVisible, employeeData, selectedEmployees})=>{
    const [checkedItems, setCheckedItems] = useState([]);

    const isChecked = (id) => {
  
      return checkedItems.includes(id);
    };

    const toggleItem = (id) => {
      if (isChecked(id) === true) {

        setCheckedItems(checkedItems.filter(item => item !== id));
      
      } else {
        setCheckedItems([...checkedItems, id]);
      }
      selectedEmployees(checkedItems)
    };
    return(
        <Modal
        animationType="slide"
        //animationInTiming = {13900}
       transparent={true}
        visible={modalVisible}
       // animationOut = "slide"
        swipeDirection = "down"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            <Text style={styles.heading}>Select Employee</Text>
          <FlatList
        data={employeeData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleItem(item.id)} key={item.id}>
            <View style={styles.container}>
            <Checkbox.Item status={isChecked(item.id) ? "checked" : "unchecked"} />
            <Avatar.Icon size={30} icon="account" />
              <Text style={styles.details}>{item.firstName} {item.lastName}</Text>
              <Divider/>
            </View>
           
          </TouchableOpacity>
        )}
      />
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={setModalVisible}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        {/* </View> */}
      </Modal>

    )
  }
  export default UserModal