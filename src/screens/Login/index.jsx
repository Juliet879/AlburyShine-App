import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
	Text,
	StatusBar,
	Image,
	ScrollView,
	useColorScheme,
	TouchableOpacity,
} from 'react-native';
// import PasswordReset from './passwordReset';
import { AuthContext } from '../../AuthProvider';

import { Formik } from 'formik';
import * as yup from 'yup';
import { TextInput, Button, IconButton } from 'react-native-paper';
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
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	const {user,login} = useContext(AuthContext)
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
						await SecureStore.setItemAsync("name", `${response.firstName} ${response.lastName}`)
						await SecureStore.setItemAsync('id',response.userId);
						await SecureStore.setItemAsync('permissionLevel', response.permissionLevel);
						response.permissionLevel === 'admin'? navigation.replace('AdminScreens',
						{ screen: 'Admin', params:{ screen: 'BottomNav' }}):navigation.replace('EmployeeScreens', {
							screen: 'Employee',
							params: { screen: 'EmployeeBottomNav' },
						  }); 
						  login(response)
					} else {
						Toast.show(response.message ||response.error, {
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
							textColor={themeTextStyle}
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
							secureTextEntry={!isPasswordVisible}
							activeOutlineColor="#276ef1"
							outlineColor="#276ef1"
							blurOnSubmit
							right={
								<TextInput.Icon
								  icon={isPasswordVisible ? 'eye' : 'eye-off'}
								  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
								  iconColor="#276ef1"
								/>
							  }
							style={LoginStyles.input}
							theme={{ colors: { text: themeTextStyle , onSurface: themeTextStyle} }}
							textColor={themeTextStyle}
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
						
					</>
				)}
			</Formik>
		</ScrollView>
	);
};

export default Login;
