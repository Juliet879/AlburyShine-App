import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Image, Text, Animated, StatusBar } from 'react-native';
import Toast from 'react-native-root-toast';

import * as SplashScreen from 'expo-splash-screen';
import splashScreenStyles from './styles';

import * as Font from 'expo-font';
import * as Device from 'expo-device';
import { Entypo } from '@expo/vector-icons';
import logo from '../../assets/icon.png';

import * as SecureStore from 'expo-secure-store';

SplashScreen.preventAutoHideAsync();

export default function InitialScreen({ navigation }) {
	const [appIsReady, setAppIsReady] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	const splashCheck = async () => {
		const timeUser = await SecureStore.getItemAsync('status');
		const item = await SecureStore.getItemAsync('token');
		if (timeUser !== null && item === null) {
			navigation.replace('Login Screen');
		}  else if ( item !== null) {
			navigation.replace('BottomNav');
		}
		else if ( timeUser === null) {
			navigation.replace('Onboard Screen');
		}
	};

	const fadeIn = () => {
		// Will change fadeAnim value to 1 in 5 seconds
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: true,
		}).start(splashCheck);
	};

	useEffect(() => {
		fadeIn();
		async function prepare() {
			try {
				await Font.loadAsync(Entypo.font);
				const device = await Device.isRootedExperimentalAsync();
				if (device) {
					Toast.show(`Application cannot be used in rooted phones`, {
						duration: Toast.durations.LONG,
					});
				}
			} catch (error) {
				Toast.show(`${error.message}`, {
					duration: Toast.durations.LONG,
				});
			} finally {
				setAppIsReady(true);
			}
		}
		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);
	if (!appIsReady) {
		return null;
	}

	return (
		<View style={splashScreenStyles.container} onLayout={onLayoutRootView}>
			<StatusBar backgroundColor={'#276EF1'} barStyle="light-content" />
			<Image source={logo} style={splashScreenStyles.image} />
			<Animated.View
				style={[splashScreenStyles.animated, { opacity: fadeAnim }]}
			>
				<Text style={splashScreenStyles.outerText}>Albury Shine</Text>
			</Animated.View>
		</View>
	);
}
