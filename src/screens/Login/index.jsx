import React, { useState, useEffect, useCallback } from 'react';
import {
	Text,
	StatusBar,
	Image,
	ScrollView,
	useColorScheme,
	TouchableOpacity,
} from 'react-native';
// import PasswordReset from './passwordReset';

import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import LoginImage from "../../assets/images/login.svg";
import LoginStyles from './styles';
import  "yup-phone"

import * as SecureStore from 'expo-secure-store';

import { API_URL } from '@env';


// const API_URL = ""
const loginValidationSchema = yup.object().shape({
	phoneNumber:yup
	.string()
	
		.required('PhoneNumber is required'),
	password: yup.string().required('Password is required'),
});

const Login = ({ navigation }) => {
	const [scanned, setScanned] = useState(false);
	const [visible, setVisible] = useState(false);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const colorScheme = useColorScheme();
	const themeTextStyle =
		colorScheme === 'light'
			? LoginStyles.lightTextColor
			: LoginStyles.darkTextColor
	const buttonTextStyle =
		colorScheme === 'light'
			? LoginStyles.lightButtonColor
			: LoginStyles.darkButtonColor;
	const labelTextStyle = colorScheme === 'light' ? '#252524' : '#252524';
	const Label = <Text style={{ color: labelTextStyle }}>PhoneNumber</Text>;
	const PasswordLabel = <Text style={{ color: labelTextStyle }}>Password</Text>;

	

	// saving login details to secure store
	const save = async (values) => {
		await SecureStore.setItemAsync('phoneNumber', values.phoneNumber);
	};



	const handleSubmit = (values, formikActions) => {
		console.log(values)
		try {
			fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
				.then((response) => response.json())
				.then(async (response) => {
					formikActions.setSubmitting(true);
console.log(response)
					if (response.status === 201) {
						Toast.show(`Login was successfull`, {
							duration: Toast.durations.LONG,
						});

						await SecureStore.setItemAsync('token', response.token);
						navigation.navigate('BottomNav');
					} else {
						Toast.show(response.error, {
							duration: Toast.durations.LONG,
						});
						formikActions.setSubmitting(false);
					}
				})
				.catch((error) => {
					Toast.show(error.message, { duration: Toast.durations.LONG });
				});

			formikActions.setSubmitting(false);
		} catch (error) {
			Toast.show(error.message, { duration: Toast.durations.LONG });
		}
	};

	return (
		<ScrollView contentContainerStyle={LoginStyles.container}>
			<StatusBar backgroundColor={'#276EF1'} barStyle="light-content" />
			<LoginImage style={LoginStyles.image}/>
			
			<Formik
				validationSchema={loginValidationSchema}
				initialValues={{
					phoneNumber: '',
					password: '',
				}}
				onSubmit={handleSubmit}
			>
				{({
					handleChange,
					handleBlur,
					handleSubmit,
					values,
					errors,
					touched,
					isValid,
					...props
				}) => (
					<>
						<TextInput
							name="phoneNumber"
							mode='outlined'
							label={Label}
							onChangeText={handleChange('phoneNumber')}
							onBlur={handleBlur('phoneNumber')}
							value={values.phoneNumber}
							keyboardType="phone-pad"
							activeOutlineColor="#276ef1"
							blurOnSubmit
							outlineColor="#276ef1"
							style={[LoginStyles.input, themeTextStyle]}
							theme={{ colors: { text: themeTextStyle } }}
						/>

						{touched.phone && errors.phone && (
							<Text style={LoginStyles.errorText}>{errors.phone}</Text>
						)}

						<TextInput
							name="password"
							mode='outlined'
							label={PasswordLabel}
							onChangeText={handleChange('password')}
							onBlur={handleBlur('password')}
							value={values.password}
							secureTextEntry={true}
							activeOutlineColor="#276ef1"
							outlineColor="#276ef1"
							blurOnSubmit
							style={LoginStyles.input}
							theme={{ colors: { text: themeTextStyle , onSurface: themeTextStyle} }}
						/>
						{touched.password && errors.password && (
							<Text style={LoginStyles.errorText}>{errors.password}</Text>
						)}

						<Button
							onPress={() => {
								save(values);
								handleSubmit();
							}}
							mode="contained"
							loading={props.isSubmitting}
							uppercase={false}
							style={LoginStyles.button}
							disabled={!isValid}
							textColor="#ffffff"
							labelStyle={buttonTextStyle}
						>
							Login
						</Button>
						{/* <TouchableOpacity>
							<Button
								textColor="#ffffff"
								labelStyle={{ color: '#124AA1' }}
								uppercase={false}
								onPress={() => setVisible(true)}
							>
								Reset Password
							</Button>
						</TouchableOpacity> */}
					</>
				)}
			</Formik>
			{/* <PasswordReset
				modalVisible={visible}
				onRequestClose={() => setVisible(!visible)}
				onPress={() => setVisible(!visible)}
			/> */}
		</ScrollView>
	);
};

export default Login;
