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
      <DataTable
      style={styles.container}
      >
      <DataTable.Header>
        <DataTable.Title>Employee Name</DataTable.Title>
        <DataTable.Title >Employee Id</DataTable.Title>
        <DataTable.Title>Task Name</DataTable.Title>
        <DataTable.Title>Start Time</DataTable.Title>
        <DataTable.Title>End Time</DataTable.Title>
        <DataTable.Title numeric>Hours Taken</DataTable.Title>
        <DataTable.Title>Location</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
      </DataTable.Header>
{timesheet.map(item=>
    <DataTable.Row
    >
        <DataTable.Cell >{item.assignee}</DataTable.Cell>
        <DataTable.Cell style={{flex: 6, overflow:"hidden"}}>{item.assigneeId}</DataTable.Cell>
        <DataTable.Cell style={{flex: 3}}>{item.taskDesc}</DataTable.Cell>
        <DataTable.Cell >{item.startTime}</DataTable.Cell>
        <DataTable.Cell >{item.endTime}</DataTable.Cell>
        <DataTable.Cell numeric >{item.hours}</DataTable.Cell>
        <DataTable.Cell >{item.location}</DataTable.Cell>
        <DataTable.Cell >{item.status}</DataTable.Cell>
      </DataTable.Row>
    
    )}
      

   

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label={`1-${timesheet.length >= 10? '10' : timesheet.length} of ${Math.floor(timesheet.length/10) > 1? Math.floor(timesheet.length/10)  +1 : '1'}`}
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  </ScrollView>
  );
}
export default TimeSheet;