import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity,View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileDrawer from "../EmployeeProfile";
import EmployeeBottomNav from "../EmployeeBottomNav";
import Message from "../../screens/Chat";
import ThreadScreen from "../../screens/ThreadScreen";
import EditEmployee from "../../screens/EmployeeEditProfile";
import { IconButton } from "react-native-paper";

const ProtectedStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const CustomHeader = ({ navigation, showBackButton }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {showBackButton && (
        <IconButton icon="arrow-left" onPress={() => navigation.goBack()} iconColor="#124aa1" />
      )}
      <IconButton icon="menu" onPress={() => navigation.toggleDrawer()} iconColor="#124aa1"/>
    </View>
  );
};

export const EmployeeScreens = () => {
  return (
    <ProtectedStack.Navigator
    initialRouteName="Employee Tasks"
    // screenOptions={({ navigation }) => ({
    //     // headerShown:false,
    //     headerLeft: () => (
    //       <TouchableOpacity
    //         style={{ marginLeft: 15 }}
    //         onPress={() => navigation.openDrawer()}
    //       >
    //         <MaterialIcons name="menu" size={24} />
    //       </TouchableOpacity>
    //     ),
    //   })}
    >
      
      <ProtectedStack.Screen name="EmployeeBottomNav" component={EmployeeBottomNav} options={{
          header: (props) => <CustomHeader {...props} showBackButton={false} />,
        }} />
      <ProtectedStack.Screen name="Thread Screen" component={ThreadScreen}/>
      <ProtectedStack.Screen name="Chat" component={Message} options={{
          header: (props) => <CustomHeader {...props} showBackButton={true} />,
        }}/>
     
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