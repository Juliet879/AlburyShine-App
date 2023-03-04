import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import styles from "./styles";

const TaskModal = ({ modalVisible, onPress, tasksData, employees }) => {
  const [employeeName, setEmployeeName] = useState([]);
  // console.log({tasksData})
  // console.log({employees})
  
  const getName = ()=>{
    if(Array.isArray(tasksData.assigneeId) && Array.isArray(employees)){
    return  employees.map(item=>
        
        tasksData.assigneeId.map(item2=>
       {   if(item.id === item2){
        // console.log({item})
        setEmployeeName(...employeeName, [`${item.firstName} ${item.lastName}`])

          }}
          ))

    }
    if(Array.isArray(employees)){
      return  employees.map(item=>
        {if(item.id === tasksData.assigneeId){
          // console.log("hey",{item})
  setEmployeeName(`${item.firstName} ${item.lastName}`)
        }}
        
        )

    }

  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      
    >
      <View style={styles.modalView}>
        <Text style={styles.heading}>Task Details</Text>
      
            <>
            <Text style={styles.details}><Text style={styles.bold}>Assignee: </Text> {tasksData.assignee? tasksData.assignee: "No data"}</Text>
            <Text style={styles.details}><Text style={styles.bold}>Task Desc: </Text> {tasksData.description}</Text>
            <Text style={styles.details}><Text style={styles.bold}>Priority: </Text>{tasksData.priority}</Text>
            <Text style={styles.details}><Text style={styles.bold}>Location: </Text>{tasksData.location}</Text>
            <Text style={styles.details}><Text style={styles.bold}>StartTime: </Text> {tasksData.startTime}</Text>
            <Text style={styles.details}><Text style={styles.bold}>EndTime:</Text> {tasksData.endTime}</Text>
            <Text style={styles.details}><Text style={styles.bold}>Completed:</Text> {tasksData.completed? tasksData.completed:"No data"}</Text>
            </>
         
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#276EF1" }}
          onPress={onPress}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};
export default TaskModal;
