import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import styles from './styles';
import { Drawer } from 'react-native-paper';
import Toast from "react-native-root-toast";
import * as SecureStore from 'expo-secure-store';
import { API_URL } from "@env";

const ProfileDrawer = (props) => {
const [token,setToken] = useState();



useEffect(()=>{
    (async () => {
        const item = await SecureStore.getItemAsync("token");
        setToken(item);
      })();


},[token])



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
