import React, { useState, useEffect, useRef, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../../screens/Onboarding';
import InitialScreen from '../../screens/SplashScreen';
import Login from '../../screens/Login';
import BottomNav from '../BottomNav';
import AddTasks from '../../screens/AddTasks';
import CreateEmployee from '../../screens/AddEmployees';
import { AuthContext } from '../../AuthProvider';
import ProtectedRoute from '../../Protectedroute';
import AdminScreens from '../ProtectedScreens';
import UnauthorizedScreen from '../../screens/Unauthorized';
import EmployeeScreens from '../EmployeeScreens';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();
const Layout = ()=>{
    const { user, isLoading } = useContext(AuthContext);
    const [initialRouteName, setInitialRouteName] = useState(null);
    const [status,setStatus] = useState()
    const [token, setToken] = useState()
    const [role, setRole] = useState()
    console.log(user);
 

    useEffect(() => {
        (async()=>{
            console.log("Hello");
            const timeUser = await SecureStore.getItemAsync('status');
            setStatus(timeUser)
            const item = await SecureStore.getItemAsync('token');
            setToken(item)
            const permission = await SecureStore.getItemAsync('permissionLevel');
            setRole(permission)
            console.log({role});
           
        })()
        if (isLoading) {
            
           setInitialRouteName('Splash Screen');
        }
        if (status !== null && token === null) {
            setInitialRouteName('Login Screen');
        }
        else if ( status === null) {
            setInitialRouteName('Onboard Screen');
        }
        // else if(user === null && token !== null){
        //     setInitialRouteName("Unauthorized")
        // }
    
       else if (role === 'admin' && token !== null && role !== undefined) {
          setInitialRouteName('AdminScreens');
        } else if (role=== 'employee' && token !== null && role !== undefined) {
          setInitialRouteName('EmployeeScreens');
        } else {
            setInitialRouteName("Unauthorized")
        }
      }, [ isLoading, token, role]);

      if (isLoading) {
        return <InitialScreen />;
      }
    return(
        <Stack.Navigator
        initialRouteName={initialRouteName}
				screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Onboard Screen' component={OnboardingScreen}/>
            <Stack.Screen name='Splash Screen' component={InitialScreen}/>
            <Stack.Screen name='Login Screen' component={Login}/>
       
        {role === 'admin'? 
        <Stack.Screen name="AdminScreens" component={AdminScreens}/>: 
        <Stack.Screen name="EmployeeScreens" component={EmployeeScreens}/>
    }
       {/* {user?.permissionLevel === 'employee'? 
        <Stack.Screen name="EmployeeScreens" component={EmployeeScreens}/>
        
    } */}
       
         <Stack.Screen name="Unauthorized" component={UnauthorizedScreen} />
        

      
          
        </Stack.Navigator>

    )
}
export default Layout;