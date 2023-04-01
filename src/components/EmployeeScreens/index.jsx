import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import EmployeeTasks from "../../screens/EmployeeTasks";
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileDrawer from "../EmployeeProfile";

const ProtectedStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const EmployeeScreens = () => {
  return (
    <ProtectedStack.Navigator
    initialRouteName="Employee Tasks"
    screenOptions={({ navigation }) => ({
        // headerShown:false,
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15, borderWidth:1 }}
            onPress={() => navigation.toggleDrawer()}
          >
            <MaterialIcons name="menu" size={24} />
          </TouchableOpacity>
        ),
      })}
    >
      
      <ProtectedStack.Screen name="Employee Tasks" component={EmployeeTasks} />
    </ProtectedStack.Navigator>
  );
};
export default EmployeeScreens;

const DrawerNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={(props) => <ProfileDrawer {...props} />}>
         {/* <Drawer.Screen name="EmployeeScreens" component={EmployeeScreens} /> */}
  
      </Drawer.Navigator>
    );
  };
