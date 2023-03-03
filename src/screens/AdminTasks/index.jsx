import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { DataTable,  Avatar, Card, IconButton } from 'react-native-paper';
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import styles from "./styles";


const AdminTasks = ()=>{
  
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState();
  const [tasks, setTasks] = useState([]);
  

  const getTasks = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employers/all-tasks`, {
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
        setTasks(response.data)
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
        getTasks();
      }
    
  }, [token]);


const  completedTasks = ()=>{
    return tasks.filter(item=>item.completed === true)
}

const completed = tasks.length> 1? completedTasks() : null
console.log({completed})
const  inCompleteTasks = ()=>{
    return tasks.filter(item=>item.completed !== true)
}

const inComplete = tasks.length> 1? inCompleteTasks() : null

  return (
 <View style={{flex:1, padding:20}}>
    <Text style={styles.title}>Tasks Overview</Text>
   <View style={{flexDirection:"row", justifyContent:"space-between"}}>
   <Card.Title
     style={styles.completed}
    title={<Text  style = {styles.cards}>{Array.isArray(completed) && completed.length >1? completed.length: 0}</Text>}
    subtitle={<Text  style = {styles.cardSub}>Completed </Text>}
    left={(props) => <Avatar.Icon {...props} icon="folder" style={styles.icons}/>}
  />
        <Card.Title
         style={styles.incomplete}
    title={<Text style = {styles.cards}>{Array.isArray(inComplete) && inComplete.length >1? inComplete.length: 0}</Text>}
    subtitle={<Text style = {styles.cardSub}>Incomplete </Text>}
    left={(props) => <Avatar.Icon {...props} icon="folder" style={styles.icons}/>}
  />
   </View>
    <Text>Hey Felix, come here boay</Text>
 </View>
  );
}
export default AdminTasks;