import React, {useState, useEffect} from "react";
import { View, Text, ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import styles from "./styles";

const optionsPerPage = [10, 10, 10];

const TimeSheet = ()=>{
    const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState();
  const [timesheet, setTImesheet] = useState([]);

  const getTimesheet = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employers/timesheet`, {
      headers,
    })
      .then((response) => {
        if (response.status === 403) {
          Toast.show(`Your session has expired, kindly login and try again`, {
            duration: Toast.durations.LONG,
          });
           SecureStore.deleteItemAsync("token")
            .then(() => navigation.replace("Login Screen"))
            .catch((error) =>
              Toast.show(error.message, {
                duration: Toast.durations.LONG,
              })
            );}
      return response.json()})
      .then(async (response) => {
        
         if (response.success === false) {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
        console.log({response});
        setTImesheet(response.message)
        setIsLoading(true);
      })
      .catch((error) => {
       

        console.log({ error });
        Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
      });
  };

  useEffect(() => {
    (async () => {
        const item = await SecureStore.getItemAsync("token");
        setToken(item);
      })();
  
      if (token !== null && token !== undefined) {
        getTimesheet();
      }
    setPage(0);
  }, [itemsPerPage,token]);

  return (
    
  <ScrollView horizontal>
      <View style={styles.container}>
      {/* Table header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Employee Name</Text>
        <Text style={styles.headerText}>Start Time</Text>
        <Text style={styles.headerText}>End Time</Text>
        <Text style={styles.headerText}>Hours Taken</Text>
        <Text style={styles.headerText}>Location</Text>
        <Text style={styles.headerText}>Status</Text>
      </View>

    <ScrollView>
{timesheet.map(item=>
      <View key={item.id} style={styles.row}>
      <Text style={styles.cell}>{item.assignee}</Text>
      <Text style={styles.cell}>{new Date(item.startTime).toLocaleString()}</Text>
      <Text style={styles.cell}>{new Date(item.endTime).toLocaleString()}</Text>
      <Text style={styles.cell}>{item.hours}</Text>
      <Text style={styles.cell}>{item.location}</Text>
      <Text style={styles.cell}>{item.status}</Text>
    </View>
    
    )}
    </ScrollView>
      
</View>
   

     
   
  </ScrollView>
  );
}
export default TimeSheet;