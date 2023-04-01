import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNav from "../BottomNav";
import AddTasks from "../../screens/AddTasks";
import CreateEmployee from "../../screens/AddEmployees";

const ProtectedStack = createStackNavigator();

const AdminScreens = () => {
  return (
    <ProtectedStack.Navigator
    initialRouteName="BottomNav"
    screenOptions={{ headerShown: false }}
    >
      <ProtectedStack.Screen name="BottomNav" component={BottomNav} />
      <ProtectedStack.Screen name="Add Tasks" component={AddTasks} />
      <ProtectedStack.Screen name="Add Employee" component={CreateEmployee} />
    </ProtectedStack.Navigator>
  );
};
export default AdminScreens;
