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

const EmployeeInvoiceList = ({ navigation }) => {
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
    <Text style={styles.title}>Employees Inventory List</Text>
  
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
               setSelectedData(item);
               setSelectedId(item.id);
            }
            }
              >
              <List.Item
              
              right={() => (
                <>
                  <List.Icon icon="file" color="#059142" />
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
    icon="account-plus"
    label="Create Invoice"
    style={styles.fab}
    onPress={() => navigation.navigate('Create Invoice')}
  />
     
     
    </View>
  );
};
export default EmployeeInvoiceList;
