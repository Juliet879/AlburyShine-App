import 'react-native-gesture-handler'
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import {NavigationContainer} from "@react-navigation/native";
import Layout from './src/components/Layout';
import { AuthProvider } from './src/AuthProvider';
import { ChatContext } from './src/components/Chat/ChatContext';
import { AppProvider } from './src/components/Chat/ChatContext';


// const
export default function App() {
	return (
		
		<RootSiblingParent>
			<PaperProvider>
				<AuthProvider>
					<AppProvider>
				<NavigationContainer>
					<Layout/>
				</NavigationContainer>
				</AppProvider>
				</AuthProvider>
			</PaperProvider>
		</RootSiblingParent>
	);
}
