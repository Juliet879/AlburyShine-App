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
  Divider,
  List,
  ActivityIndicator,
  FAB
} from "react-native-paper";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import styles from "./styles";
import EmployeeDetailModal from "../../components/EmployeeDetailModal";
import AdminEditEmployee from "../../components/EditEmployeeAdmin";

const AllEmployees = ({ navigation }) => {
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState();
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [employees, setEmployees] = useState();
  const [editmodal, setEditModalVisible] = useState(false)

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
        console.log({response})
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



  useEffect(() => {
    (async () => {
      const item = await SecureStore.getItemAsync("token");
      setToken(item);
    })();

    if (token !== null && token !== undefined) {
    
      getEmployees();
    }
  }, [token]);



  const handleSubmit = (id) => {
   
    const values = {
      employeeId: id,
    };
    console.log(JSON.stringify(values))
    console.log({token})
    fetch(`${API_URL}/employers/delete-employee`, {
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
          const newEmployees= employees.filter (item=> item.id !== id)
         return setEmployees(newEmployees)
        } 
        if (response.status === 404)  {
          Toast.show(response.message, {
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
      'Delete employee?',
      //body
      'Are you sure you want to delete this employee ?',
      [
        { text: 'Yes', onPress: () => handleSubmit(id) },
        {
          text: 'No',
          onPress: () =>  Toast.show('Employee deleting canceled', {
            duration: Toast.durations.LONG,
          }),
          style: 'cancel',
        },
      ],
      { cancelable: false }
      //clicking out side of alert will not cancel
    );
  };

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
    <Text style={styles.title}>Employees</Text>
  
      <SafeAreaView>
        {/* <Text style={styles.heading}>Tasks</Text> */}
        <FlatList
          data={employees}
          // keyExtractor={(item) => item.id}
          // key={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                key={item.id}
                style={{ width:"62%"}}
                onPress={() => {
                  setSelectedId(item.id);
                  setModalVisible(true);
                  setSelectedData(item);
                }}
              >
                    <List.Item
                    title={ <Text style={{ color: "#333235"}}>{item.firstName} {item.lastName}</Text>}
                    left={() => (
                        <>
                          <List.Icon icon="account" color="#276EF1" />
                        </>
                      )}
                    />
              
           
            
               
              </TouchableOpacity>
              <TouchableOpacity
              key={item.editId}
              style={{ color: "#333235" }}
              onPress={()=>{
               setEditModalVisible(true);
               setSelectedData(item);
               setSelectedId(item.id);
            }
            }
              >
              <List.Item
              
              right={() => (
                <>
                  <List.Icon icon="pencil" color="#059142" />
                </>
              )}
            />
              </TouchableOpacity>
              <TouchableOpacity
              key={item.id}
              style={{ color: "#333235" }}
              onPress={()=>{
                deleteConfirm(item.id)
            }
            }
              >
              <List.Item
              
              right={() => (
                <>
                  <List.Icon icon="delete-outline" color="grey" />
                </>
              )}
            />
              </TouchableOpacity>
          
            </View>
          )}
        />

      </SafeAreaView>
      <Divider/>
      <FAB
    icon="message-plus"
    label="Chat"
    style={styles.chat}
    onPress={() => navigation.navigate('Channel List')}
  />
      <FAB
    icon="account-plus"
    label="Add Employee"
    style={styles.fab}
    onPress={() => navigation.navigate('Add Employee')}
  />
      <EmployeeDetailModal
        employees={selectedData}
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
      />
      <AdminEditEmployee
      employee={selectedData}
      modalVisible={editmodal}
      onPress={() => setEditModalVisible(false)}
      />
    </View>
  );
};
export default AllEmployees;
