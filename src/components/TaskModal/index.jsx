import React, { useState , useEffect} from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import styles from "./styles";

const TaskModal = ({ modalVisible, onPress, tasksData, employees }) => {
  const [employeeName, setEmployeeName] = useState([]);
  // console.log({tasksData})
  // console.log({employees})
  
  const getName = () => {
    if (Array.isArray(tasksData.assigneeId) && Array.isArray(employees)) {
      const matchedNames = [];
  
      employees.forEach((employee) => {
        if (tasksData.assigneeId.includes(employee.id)) {
          matchedNames.push(`${employee.firstName} ${employee.lastName}`);
        }
      });
  
      setEmployeeName(matchedNames);
    } else if (Array.isArray(employees)) {
      const matchedEmployee = employees.find(
        (employee) => employee.id === tasksData.assigneeId
      );
  
      if (matchedEmployee) {
        setEmployeeName(`${matchedEmployee.firstName} ${matchedEmployee.lastName}`);
      }
    }
  };
  


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
            <Text style={styles.details}><Text style={styles.bold}>Completed:</Text> {tasksData.status? tasksData.status:"No data"}</Text>
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
