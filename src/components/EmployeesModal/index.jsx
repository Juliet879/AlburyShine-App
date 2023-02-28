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
    Checkbox,
    Title,
    Paragraph
  } from "react-native";
  import styles from "./style.js"


const UserModal =({modalVisible,setModalVisible, employeeData})=>{
    const [checkedItems, setCheckedItems] = useState([]);

    const isChecked = (id) => {
      return checkedItems.includes(id);
    };
  
    const toggleItem = (id) => {
      if (isChecked(id)) {
        setCheckedItems(checkedItems.filter(item => item !== id));
      } else {
        setCheckedItems([...checkedItems, id]);
      }
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
          <FlatList
        data={employeeData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleItem(item.id)}>
            <Card>
              {/* <Card.Content style={s.content}> */}
                {/* <Checkbox status={isChecked(item.id) ? "checked" : "unchecked"} /> */}

            </Card>
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