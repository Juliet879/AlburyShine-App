import React, { useState, useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../../screens/Onboarding';
import InitialScreen from '../../screens/SplashScreen';
import Login from '../../screens/Login';
import BottomNav from '../BottomNav';

const Stack = createStackNavigator();
const Layout = ()=>{
    return(
        <Stack.Navigator
        initialRouteName="Splash Screen"
				screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Onboard Screen' component={OnboardingScreen}/>
            <Stack.Screen name='Splash Screen' component={InitialScreen}/>
            <Stack.Screen name='Login Screen' component={Login}/>
            <Stack.Screen name='BottomNav' component={BottomNav}/>
        </Stack.Navigator>

    )
}
export default Layout;