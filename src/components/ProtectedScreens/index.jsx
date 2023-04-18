import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNav from "../BottomNav";
import AddTasks from "../../screens/AddTasks";
import CreateEmployee from "../../screens/AddEmployees";
import Message from "../../screens/Chat";
import ChannelListings from "../Chat/ChannelList";
import ThreadScreen from "../../screens/ThreadScreen";
import ProfileDrawer from "../AdminProfile";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton } from "react-native-paper";
import { View } from "react-native";

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


export const AdminScreens = () => {
  return (
    <ProtectedStack.Navigator
    initialRouteName="BottomNav"
   
    >
      <ProtectedStack.Screen name="BottomNav" component={BottomNav}   options={{
          header: (props) => <CustomHeader {...props} showBackButton={false} />,
        }}/>
      <ProtectedStack.Screen name="Add Tasks" component={AddTasks} options={{ headerShown: true }}/>
      <ProtectedStack.Screen name="Add Employee" component={CreateEmployee} />
      <ProtectedStack.Screen name="Chat" component={Message}/>
      <ProtectedStack.Screen name="Channel List" component={ChannelListings}/>
      <ProtectedStack.Screen name="Thread Screen" component={ThreadScreen}/>
    </ProtectedStack.Navigator>
  );
};

const AdminDrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <ProfileDrawer {...props} />}>
       <Drawer.Screen name="Admin" component={AdminScreens} options={{ headerShown: false }}/>

    </Drawer.Navigator>
  );
};
export default AdminDrawerNavigator;