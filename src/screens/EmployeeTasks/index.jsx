import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import {
  DataTable,
  Avatar,
  Card,
  IconButton,
  Divider,
  List,
  Button,
  ActivityIndicator,
  FAB
} from "react-native-paper";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import styles from "./styles";
import TaskModal from "../../components/TaskModal";

const EmployeeTasks = ({ navigation }) => {
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState();
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [employees, setEmployees] = useState();

  const getEmployees = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employers/all-employees`, {
      headers,
    })
      .then((response) => {
      
   
        return response.json();
      })
      .then(async (response) => {
        if (response.success === false) {
          console.log({ response });
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
      
        setEmployees(response.data);
        // response.data ? setEmployees(response.data) : setEmployees([]);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log({ error });
        Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
      });
  };

  const getTasks = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employees/all-tasks`, {
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
            );
        }
        return response.json();
      })
      .then(async (response) => {
        console.log(response);
        if (response.success === false) {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
       
        setTasks(response.data);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log({error});
        // if (response.status === 403) {
        //     Toast.show(`Your session has expired, kindly login and try again`, {
        //       duration: Toast.durations.LONG,
        //     });
        //     SecureStore.deleteItemAsync("token")
        //       .then(() => navigation.replace("Login Screen"))
        //       .catch((error) =>
        //         Toast.show(error.message, {
        //           duration: Toast.durations.LONG,
        //         })
        //       );
        //   }
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
      getEmployees();
    }
  }, [token]);



  const handleSubmit = (id) => {
   
    const values = {
      taskId: id,
    };
    console.log(JSON.stringify(values))
    console.log({token})
    fetch(`${API_URL}/employers/delete-task`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) =>response.json())
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          Toast.show(response.message, {
            duration: Toast.durations.LONG,
          });
          const newTasks= tasks.filter (item=> item.taskId !== id)
         return setTasks(newTasks)
        } else {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((error) => {
        console.log(error)
        Toast.show(error.message, { duration: Toast.durations.LONG });
      });
  };

  const deleteConfirm = (id) => {
    console.log({id})
    //function to make two option alert
    Alert.alert(
      //title
      'Delete task?',
      //body
      'Are you sure you want to delete this task ?',
      [
        { text: 'Yes', onPress: () => handleSubmit(id) },
        {
          text: 'No',
          onPress: () =>  Toast.show('Task deleting canceled', {
            duration: Toast.durations.LONG,
          }),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

  const completedTasks = () => {
    return tasks.filter((item) => item.completed === true);
  };

  const completed = tasks.length > 1 ? completedTasks() : null;
  console.log({ completed });
  const inCompleteTasks = () => {
    return tasks.filter((item) => item.completed !== true);
  };

  const inComplete = tasks.length > 1 ? inCompleteTasks() : null;
  if(loading !== true){
  return (
    <>
     <ActivityIndicator animating={true} color="#276EF1" size="large" style={styles.activity}/>
     <Text style={styles.activityText}>Loading ...</Text>
    </>
  )
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
    <Text style={styles.title}>Tasks Overview</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Card.Title
          style={styles.completed}
          title={
            <Text style={styles.cards}>
              {Array.isArray(completed) && completed.length > 1
                ? completed.length
                : 0}
            </Text>
          }
          subtitle={<Text style={styles.cardSub}>Completed </Text>}
          left={(props) => (
            <Avatar.Icon {...props} icon="folder" style={styles.icons} />
          )}
        />
        <Card.Title
          style={styles.incomplete}
          title={
            <Text style={styles.cards}>
              {Array.isArray(inComplete) && inComplete.length > 1
                ? inComplete.length
                : 0}
            </Text>
          }
          subtitle={<Text style={styles.cardSub}>Incomplete </Text>}
          left={(props) => (
            <Avatar.Icon {...props} icon="folder" style={styles.icons} />
          )}
        />
      </View>
      <SafeAreaView>
        <Text style={styles.heading}>Tasks</Text>
       {tasks.length === 0? 
    <Text>No tasks</Text>  :
    <FlatList
    data={tasks}
    keyExtractor={(item) => item.taskId}
    key={(item) => item.taskId}
    renderItem={({ item }) => (
      <View
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <TouchableOpacity
          key={item.taskId}
          style={{ width:"62%"}}
          onPress={() => {
            setSelectedId(item.taskId);
            setModalVisible(true);
            setSelectedData(item);
          }}
        >
              <List.Item
              title={ <Text style={{ color: "#333235"}}>{item.description}</Text>}
        
     
      />
         
        </TouchableOpacity>
       
    
      </View>
    )}
  />
    }
 
      </SafeAreaView>
  
      <TaskModal
        employees={employees}
        tasksData={selectedData}
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
      />
    </View>
  );
};
export default EmployeeTasks;
