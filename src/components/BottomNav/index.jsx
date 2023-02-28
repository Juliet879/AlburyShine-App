import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimeSheet from '../../screens/Timesheet';
import AdminTasks from '../../screens/AdminTasks';
import AddTasks from '../../screens/AddTasks';
import {
	Ionicons,
  FontAwesome5
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomNav = ()=> {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown:false,
        unmountOnBlur:true,
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;

            if (route.name === 'Tasks') {
                iconName = focused ? 'tasks' : 'tasks';
                iconColor =focused ?  '#124aa1' : '#828282'
            } else if (route.name === 'Add Tasks') {
                iconName = focused ? 'plus-circle' : 'plus-circle';
                iconColor =focused ?  '#124aa1' : '#828282'

            } else if (route.name === 'Timesheet') {
                iconName = focused ? 'file-alt' : 'file-alt';
                iconColor =focused ?  '#124aa1' : '#828282'

            }
            return < FontAwesome5 name={iconName} size={size} color={iconColor} />;
        },
    })}
    >
      <Tab.Screen name="Tasks" component={AdminTasks} />
      <Tab.Screen name="Add Tasks" component={AddTasks} />
      <Tab.Screen name="Timesheet" component={TimeSheet} />
    </Tab.Navigator>
  );
}
export default BottomNav