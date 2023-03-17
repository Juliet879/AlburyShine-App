import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  StatusBar,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { TextInput, Button, Portal , Avatar, Divider, SegmentedButtons} from "react-native-paper";
import { API_URL } from "@env";
import Toast from "react-native-root-toast";
import styles from "./styles";



const AdminEditEmployee = ({ navigation, employee, modalVisible, onPress }) => {

  const [token, setToken] = useState();
  const [employees, setEmployees] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const[selectedEmployee, setSelectedEmployee] = useState([])
  const [priority, setPriority] = useState('')
  const [value, setValue] = useState('');

 

  useEffect(() => {
    (async () => {
      const item = await SecureStore.getItemAsync("token");
      setToken(item);
    })();

    // if (token !== null && token !== undefined) {
    //   getEmployees();
    // }
  }, [token]);


 

 console.log({employee})


  

  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightTextColor : "#000000";
  const buttonTextStyle =
    colorScheme === "light" ? styles.lightButtonColor : styles.darkButtonColor;
  const labelTextStyle = colorScheme === "light" ? styles.lightTextColor: styles.lightTextColor;

  const employeeValidationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email().required("Email address is required"),
    phoneNumber:yup.string().required("Phone Number is required")
 

  });
  const handleSubmit = (values, formikActions) => {
		
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
		try {
			fetch(`${API_URL}/employers/create-employee`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(values),
			})
				.then((response) => response.json())
				.then(async (response) => {
					formikActions.setSubmitting(true);
console.log(response)
					if (response.status === 200) {
						Toast.show(response.data, {
							duration: Toast.durations.LONG,
						});

                        navigation.replace('All Employees')


					} 
                    if(response.status === 400){
						Toast.show(response.message, {
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
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    >
      <ScrollView contentContainerStyle={styles.container}>
    
      <Text style={styles.title}>Edit Employee Details</Text>
      <Formik
        validationSchema={employeeValidationSchema}
        initialValues={{
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>First Name:</Text>
            <TextInput
              name="firstName"
              mode="outlined"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
              activeOutlineColor="#276ef1"
              blurOnSubmit
              outlineColor="#276ef1"
              style={[styles.input, themeTextStyle]}
              theme={{ colors: { text: themeTextStyle } }}
              textColor={themeTextStyle}
            />

            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Last Name:</Text>
            <TextInput
              name="lastName"
              mode="outlined"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
              activeOutlineColor="#276ef1"
              outlineColor="#276ef1"
              blurOnSubmit
              style={styles.input}
              theme={{ colors: { text: themeTextStyle } }}
              textColor={themeTextStyle}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

<Text style={{ fontSize: 18, fontWeight: "bold" }}>Email Address:</Text>
            <TextInput
              name="email"
              mode="outlined"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              activeOutlineColor="#276ef1"
              outlineColor="#276ef1"
              blurOnSubmit
              style={styles.input}
              theme={{ colors: { text: themeTextStyle } }}
              textColor={themeTextStyle}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
             <Text style={{ fontSize: 18, fontWeight: "bold" }}>Phone Number:</Text>
            <TextInput
              name="phoneNumber"
              mode="outlined"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              activeOutlineColor="#276ef1"
              outlineColor="#276ef1"
              blurOnSubmit
              style={styles.input}
              theme={{ colors: { text: themeTextStyle } }}
              textColor={themeTextStyle}
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          

           
           

       


            <Button
            onPress={()=>handleSubmit()}
              mode="contained"
              loading={props.isSubmitting}
              uppercase={false}
              style={styles.submit}
              disabled={!isValid}
              textColor="#ffffff"
              labelStyle={buttonTextStyle}
              
            >
              Edit Employee
            </Button>
            <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#276EF1" }}
          onPress={onPress}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableHighlight>
          </>
        )}
      </Formik>
    </ScrollView>  
    </Modal>
  );
};
export default AdminEditEmployee;
