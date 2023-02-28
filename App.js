
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import {NavigationContainer} from "@react-navigation/native";
import Layout from './src/components/Layout';

// const
export default function App() {
	return (
		<RootSiblingParent>
			<PaperProvider>
				<NavigationContainer>
					<Layout/>
				</NavigationContainer>
			</PaperProvider>
		</RootSiblingParent>
	);
}
