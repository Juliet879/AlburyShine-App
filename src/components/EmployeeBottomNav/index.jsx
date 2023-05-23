import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeeTasks from '../../screens/EmployeeTasks';
import ChannelListings from '../Chat/ChannelList';
import Invoice from '../../screens/EmployeeInvoiceAdmin';
import EmployeeInvoiceSingleList from '../../screens/EmployeeInvoiceSingleList';
import {
	Ionicons,
  FontAwesome5
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const EmployeeBottomNav = ()=> {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown:false,
        unmountOnBlur:true,
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;

            if (route.name === 'Employee Tasks') {
                iconName = focused ? 'tasks' : 'tasks';
                iconColor =focused ?  '#124aa1' : '#828282'
            } else if (route.name === 'Channel List') {
                iconName = focused ? 'comment-alt' : 'comment-alt';
                iconColor =focused ?  '#124aa1' : '#828282'

            } else if (route.name === 'My Invoices') {
                iconName = focused ? 'file-invoice-dollar' : 'file-invoice-dollar';
                iconColor =focused ?  '#124aa1' : '#828282'

            }
            return < FontAwesome5 name={iconName} size={size} color={iconColor} />;
        },
    })}
    >
      <Tab.Screen name="Employee Tasks" component={EmployeeTasks} />
      <Tab.Screen name="Channel List" component={ChannelListings}/>
      <Tab.Screen name="My Invoices" component={EmployeeInvoiceSingleList} />
    </Tab.Navigator>
  );
}
export default EmployeeBottomNav