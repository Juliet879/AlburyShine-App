import React, { useState, useEffect, useRef, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../../screens/Onboarding';
import InitialScreen from '../../screens/SplashScreen';
import Login from '../../screens/Login';
import BottomNav from '../BottomNav';
import AddTasks from '../../screens/AddTasks';
import CreateEmployee from '../../screens/AddEmployees';
import { AuthContext } from '../../AuthProvider';
import UnauthorizedScreen from '../../screens/Unauthorized';
import * as SecureStore from 'expo-secure-store';
import DrawerNavigator from '../EmployeeScreens';
import { useChatClient } from '../Chat/ChatHook';
import { Text, StatusBar} from 'react-native';
import { OverlayProvider,Chat } from 'stream-chat-expo';
import { STREAM_API_KEY } from '@env';
import { StreamChat } from 'stream-chat';
import AdminDrawerNavigator from '../ProtectedScreens';

const chatClient = StreamChat.getInstance(STREAM_API_KEY)

const Stack = createStackNavigator();
const Layout = ()=>{
    const { user, isLoading } = useContext(AuthContext);
    const [initialRouteName, setInitialRouteName] = useState(null);
    const [status,setStatus] = useState()
    const [token, setToken] = useState()
    const [role, setRole] = useState()
    const {clientIsReady} = useChatClient()
    const chatTheme = {
      channelPreview: {
        container: {
          backgroundColor: 'transparent',
        }
      }
    };

    useEffect(() => {
        (async()=>{
            const timeUser = await SecureStore.getItemAsync('status');
            setStatus(timeUser)
            const item = await SecureStore.getItemAsync('token');
            setToken(item)
            const permission = await SecureStore.getItemAsync('permissionLevel');
            setRole(permission)
           
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
      // if (!clientIsReady) {
      //   return <Text>Loading chat ...</Text>
      // }
      if (isLoading) {
        return <InitialScreen />;
      }
   
    return(
      <OverlayProvider value={{ theme: chatTheme }}>
        <StatusBar backgroundColor={'#276EF1'} barStyle="light-content" />
        <Chat client={chatClient} >
        <Stack.Navigator
        initialRouteName={initialRouteName}
				screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Onboard Screen' component={OnboardingScreen}/>
            <Stack.Screen name='Splash Screen' component={InitialScreen}/>
            <Stack.Screen name='Login Screen' component={Login}/>
       
        {role === 'admin'? 
        <Stack.Screen name="AdminScreens" component={AdminDrawerNavigator}/>: 
        <Stack.Screen name="EmployeeScreens" component={DrawerNavigator}/>
    }
       {/* {user?.permissionLevel === 'employee'? 
        <Stack.Screen name="EmployeeScreens" component={EmployeeScreens}/>
        
    } */}
       
         <Stack.Screen name="Unauthorized" component={UnauthorizedScreen} />
        

      
          
        </Stack.Navigator>
        </Chat>
        </OverlayProvider>

    )
}
export default Layout;