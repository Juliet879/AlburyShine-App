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

const Stack = createStackNavigator();
const Layout = ()=>{
    const { user } = useContext(AuthContext);
    console.log(user);


    return(
        <Stack.Navigator
        initialRouteName="Splash Screen"
				screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Onboard Screen' component={OnboardingScreen}/>
            <Stack.Screen name='Splash Screen' component={InitialScreen}/>
            <Stack.Screen name='Login Screen' component={Login}/>
            {/* {user.permissionLevel === 'admin' && ( */}
                {/* <> */}
                  <Stack.Screen name='BottomNav' component={BottomNav}/>
            <Stack.Screen name='Add Tasks' component={AddTasks}/>
            <Stack.Screen name='Add Employee' component={CreateEmployee}/>
                {/* </> */}

            {/* )} */}
          
        </Stack.Navigator>

    )
}
export default Layout;