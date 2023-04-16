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
const CustomHeader = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
      {/* Add other header components */}
    </View>
  );
};

export const AdminScreens = () => {
  return (
    <ProtectedStack.Navigator
    initialRouteName="BottomNav"
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
      <ProtectedStack.Screen name="BottomNav" component={BottomNav} />
      <ProtectedStack.Screen name="Add Tasks" component={AddTasks} />
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