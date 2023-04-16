import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileDrawer from "../EmployeeProfile";
import EmployeeBottomNav from "../EmployeeBottomNav";
import Message from "../../screens/Chat";
import ThreadScreen from "../../screens/ThreadScreen";
import EditEmployee from "../../screens/EmployeeEditProfile";

const ProtectedStack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const EmployeeScreens = () => {
  return (
    <ProtectedStack.Navigator
    initialRouteName="Employee Tasks"
    screenOptions={({ navigation }) => ({
        // headerShown:false,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => navigation.openDrawer()}
          >
            <MaterialIcons name="menu" size={24} />
          </TouchableOpacity>
        ),
      })}
    >
      
      <ProtectedStack.Screen name="EmployeeBottomNav" component={EmployeeBottomNav} />
      <ProtectedStack.Screen name="Thread Screen" component={ThreadScreen}/>
      <ProtectedStack.Screen name="Chat" component={Message}/>
     
    </ProtectedStack.Navigator>
  );
};


const DrawerNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={(props) => <ProfileDrawer {...props} />}>
         <Drawer.Screen name="Employee" component={EmployeeScreens} options={{ headerShown: false }}/>
         <Drawer.Screen name="Edit Profile" component={EditEmployee}/>
  
      </Drawer.Navigator>
    );
  };
export default DrawerNavigator;