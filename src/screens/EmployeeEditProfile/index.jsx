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
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import {
  TextInput,
  Button,
  Portal,
  IconButton,
  Avatar,
  DefaultTheme,
} from "react-native-paper";
import { API_URL } from "@env";
import Toast from "react-native-root-toast";
import styles from "./styles";
import * as ImagePicker from "expo-image-picker";

const EditEmployee = ({ navigation, employee, modalVisible, onPress }) => {
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const getEmployee = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employees/get-employee/${employeeId}`, {
      headers,
    })
      .then((response) => {
        if (response.status === 403) {
          Toast.show(`Your session has expired, kindly login and try again`, {
            duration: Toast.durations.LONG,
          });
          SecureStore.deleteItemAsync("token")
            .then(() => navigation.replace("Login Screen"))
            .catch((error) =>
              Toast.show(error.message, {
                duration: Toast.durations.LONG,
              })
            );
        }
        return response.json();
      })
      .then(async (response) => {
        if (response.success === false) {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }

        setEmployeeDetails(response.data);
        setIsLoading(true);
      })
      .catch((error) => {
        Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
      });
  };
  useEffect(() => {
    (async () => {
      const item = await SecureStore.getItemAsync("token");
      setToken(item);
      const id = await SecureStore.getItemAsync("id");
      setEmployeeId(id);
    })();
    if (
      token !== null &&
      token !== undefined &&
      employeeId !== null &&
      employeeId !== undefined
    ) {
      getEmployee();
    }
  }, [token, employeeId]);

  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightTextColor : "#000000";
  const buttonTextStyle =
    colorScheme === "light" ? styles.lightButtonColor : styles.darkButtonColor;

  const customTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#124aa1", // Replace 'red' with the color you want for the label
    },
  };

  const PasswordUpdateSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, formikActions) => {
    console.log({ values });
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      fetch(`${API_URL}/employees/profile/${employeeId}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(values),
      })
        .then((response) => 
            response.json())
        .then((response) => {
          formikActions.setSubmitting(true);
          console.log({ response });
          if (response.status === 200) {
            Toast.show(response.message, {
              duration: Toast.durations.LONG,
            });

            // navigation.replace("All Employees");
          }
          if (response.status === 400) {
            Toast.show(response.message, {
              duration: Toast.durations.LONG,
            });
            formikActions.setSubmitting(false);
          }
        })
        .catch((error) => {
            console.log({error});
          Toast.show(error.message, { duration: Toast.durations.LONG });
        });

      formikActions.setSubmitting(false);
    } catch (error) {
      Toast.show(error.message, { duration: Toast.durations.LONG });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee Details</Text>

      <>
        <Avatar.Text
          size={150}
          label={employeeDetails.firstName}
          style={styles.avatar}
          onPress={pickImage}
        />
        <TextInput
          label="First Name"
          value={employeeDetails.firstName}
          style={[styles.input, themeTextStyle]}
          theme={customTheme}
          textColor={themeTextStyle}
          disabled
        />
        <TextInput
          label="Last Name"
          value={employeeDetails.lastName}
          style={[styles.input, themeTextStyle]}
          theme={customTheme}
          textColor={themeTextStyle}
          disabled
        />
        <TextInput
          label="Email"
          value={employeeDetails.email}
          style={[styles.input, themeTextStyle]}
          theme={customTheme}
          textColor={themeTextStyle}
          disabled
        />
        <TextInput
          label={<Text>PhoneNumber</Text>}
          disabled
          value={employeeDetails.phoneNumber}
          style={[styles.input, themeTextStyle]}
          theme={customTheme}
          textColor={themeTextStyle}
        />
        <View style={styles.passwordContainer}>
                <TextInput
                  label=" Current Password"
                  style={[styles.passwordInput, themeTextStyle]}
                  theme={customTheme}
                  textColor={themeTextStyle}
                  secureTextEntry={!showPassword}
                  value={showPassword ? employeeDetails.password : '••••••••'}
    
                />
                <IconButton
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
                 <IconButton
                  icon={"pen"}
                  iconColor="#124aa1"
                  onPress={() => setIsEditMode((item)=>!item)}
                />
              </View>
      {isEditMode && (
        <Formik
          validationSchema={PasswordUpdateSchema}
          initialValues={{
            password: "",
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
              <View style={styles.passwordContainer}>
              <Field
  name="password"
  component={TextInput}
  label="New Password"
  value={values.password}
  onChangeText={handleChange('password')}
  style={styles.passwordInput}
//   secureTextEntry={!showPassword}
  theme={customTheme}
  onFocus={() => setIsPasswordFocused(true)}
  onBlur={() => setIsPasswordFocused(false)}
/>
                {/* <IconButton
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                /> */}
              </View>
              {isPasswordFocused && (
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  uppercase={false}
                  style={styles.button}
                  disabled={!isValid}
                  textColor="#ffffff"
                  labelStyle={buttonTextStyle}
                >
                  Save Password
                </Button>
              )}
            </>
          )}
        </Formik>
      )}       
        
      </>
    </ScrollView>
  );
};
export default EditEmployee;
