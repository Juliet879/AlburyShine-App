
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import {NavigationContainer} from "@react-navigation/native";
import Layout from './src/components/Layout';
import { AuthProvider } from './src/AuthProvider';

// const
export default function App() {
	return (
		
		<RootSiblingParent>
			<PaperProvider>
				<AuthProvider>
				<NavigationContainer>
					<Layout/>
				</NavigationContainer>
				</AuthProvider>
			</PaperProvider>
		</RootSiblingParent>
	);
}
