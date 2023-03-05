import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";
import styles from "./styles";

const EmployeeDetailModal = ({ modalVisible, onPress, employees }) => {


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      
    >
      <View style={styles.modalView}>
        <Text style={styles.heading}>Employee Details</Text>
      
            <>
            <Text style={styles.details}><Text style={styles.bold}>Employee Name: </Text> {employees.firstName} {employees.firstName}</Text>
            <Text style={styles.details}><Text style={styles.bold}>Email: </Text> {employees.email}</Text>
            <Text style={styles.details}><Text style={styles.bold}>PhoneNumber: </Text>{employees.phoneNumber}</Text>
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
export default EmployeeDetailModal;
