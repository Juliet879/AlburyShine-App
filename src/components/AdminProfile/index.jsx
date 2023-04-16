import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import styles from './styles';
import { Drawer } from 'react-native-paper';
import Toast from "react-native-root-toast";
import * as SecureStore from 'expo-secure-store';
import { API_URL } from "@env";

const ProfileDrawer = (props) => {
const [employeeDetails, setEmployeeDetails] = useState([]);
const [token,setToken] = useState();
const [employerid,setEmployerId] = useState();
const [loading, setIsLoading] = useState(false);

// const getEmployee=()=>{
//     const headers = {
//         Authorization: "Bearer " + token,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       };
//       fetch(`${API_URL}/employees/get-employee/${employeeid}`, {
//         headers,
//       })
//         .then((response) => {
//             if (response.status === 403) {
//                 Toast.show(`Your session has expired, kindly login and try again`, {
//                   duration: Toast.durations.LONG,
//                 });
//                 SecureStore.deleteItemAsync("token")
//                   .then(() => navigation.replace("Login Screen"))
//                   .catch((error) =>
//                     Toast.show(error.message, {
//                       duration: Toast.durations.LONG,
//                     })
//                   );
//               }
//           return response.json();
//         })
//         .then(async (response) => {
//           if (response.success === false) {
//             Toast.show(response.error, {
//               duration: Toast.durations.LONG,
//             });
//           }
  
//           setEmployeeDetails(response.data);
//           setIsLoading(true);
//         })
//         .catch((error) => {
//           Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
//         });
// }
useEffect(()=>{
    (async () => {
        const item = await SecureStore.getItemAsync("token");
        setToken(item);
        const id = await SecureStore.getItemAsync("id");
        setEmployerId(id);
      })();
    //   if(token !== null && token !== undefined&& employeeid !== null && employeeid !== undefined){
    //     getEmployee();
    //   }

},[token, employerid])



  const handleLogout = async () => {
    // Add your custom button action here
    console.log('Custom button pressed');
    // Close the drawer
  await  SecureStore.deleteItemAsync("token")
    .then(() => {
        props.navigation.replace("Login Screen")
        return Toast.show('Logout was successful',{
            duration: Toast.durations.LONG,
          })
  })
    .catch((error) =>
      Toast.show(error.message, {
        duration: Toast.durations.LONG,
      }))
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Drawer.Item label="Logout" onPress={handleLogout}
      icon="lock-open"/>
    
    </DrawerContentScrollView>
  );
};



export default ProfileDrawer;
