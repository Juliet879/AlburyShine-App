import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  StatusBar,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import { TextInput, Button, Modal, Portal } from "react-native-paper";
import { API_URL } from "@env";
import moment from "moment";
import DatePicker from "react-datepicker";
import Toast from "react-native-root-toast";
import styles from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserModal from "../../components/EmployeesModal";

const AddTasks = ({ navigation }) => {
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showEnd, setEndTimeShow] = useState(false);
  const [token, setToken] = useState();
  const [employees, setEmployees] = useState();
  const [loading, setIsLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const item = await SecureStore.getItemAsync("token");
      setToken(item);
    })();

    if (token !== null && token !== undefined) {
      getEmployees();
    }
  }, [token]);

  const getEmployees = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employers/all-employees`, {
      headers,
    })
      .then((response) => response.json())
      .then(async (response) => {
        console.log({ response });
        if (response.status === 403) {
          Toast.show(`Your session has expired, kindly login and try again`, {
            duration: Toast.durations.LONG,
          });
          await SecureStore.deleteItemAsync("token")
            .then(() => navigation.replace("Login"))
            .catch((error) =>
              Toast.show(error.message, {
                duration: Toast.durations.LONG,
              })
            );
        } else if (response.success === false) {
          console.log({ response });
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
        console.log(response.data);
        setEmployees(response.data)
        // response.data ? setEmployees(response.data) : setEmployees([]);
        setIsLoading(true);
      })
      .catch((error) => {
        // await SecureStore.deleteItemAsync('token') .then(() => navigation.replace('Login'))

        console.log({ error });
        Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setStartDate(currentDate);
  };
  const onChangeEndDate = (event, selectedDate) => {
    console.log("Hello");
    const currentDate = selectedDate;
    setEndTimeShow(false);
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const showEndTimeMode = (currentMode) => {
    setEndTimeShow(true);
    setMode(currentMode);
  };

  const showEndDatepicker = () => {
    showEndTimeMode("date");
  };

  const showEndTimepicker = () => {
    showEndTimeMode("time");
  };

  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightTextColor : "#000000";
  const buttonTextStyle =
    colorScheme === "light" ? styles.lightButtonColor : styles.darkButtonColor;
  const labelTextStyle = colorScheme === "light" ? "#252524" : "#252524";
  const Label = <Text style={{ color: labelTextStyle }}>Location</Text>;
  const DescriptionLabel = (
    <Text style={{ color: labelTextStyle }}>Description</Text>
  );
  const tasksValidationSchema = yup.object().shape({
    location: yup.string().required("Location is required"),
    description: yup.string().required("Description is required"),
    //       start_date: yup.date()
    //       .max(new Date(), ()=>({ id: 'start_date.error.max' }))
    //       .required(),
    //     start_time: yup.string().required(),
    //     end_date: yup.date()
    //     .min(new Date(start_date), ()=>({ id: 'end_date.error.min' }))
    //     .max(new Date(), ()=>({ id: 'end_date.error.max' }) )
    //     .required(),
    //   end_time: yup.string()
    //     .required('end_time.error.required' )
    //     .test('min_end_time', ()=>({ id: 'end_time.error.min_time' }), function (value) {
    //       const { end_date } = start_date
    //       if (start_date === moment(end_date).format('ddd MMM DD YYYY')) {
    //         return moment(value, 'HH:mm').isSameOrAfter(moment(start_time, 'HH:mm').add(1, 'hours'))
    //       } else {
    //         return true
    //       }
    //     }),
    password: yup.string().required("Password is required"),
  });

  const handleDateChange = () => {
    setStartDate(start_date);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor={"#276EF1"} barStyle="light-content" />
      <Formik
        // validationSchema={loginValidationSchema}
        initialValues={{
          location: "",
          start_time: "",
          end_time: "",
          description: "",
          priority: "",
          assignee: "",
        }}
        // onSubmit={handleSubmit}
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
            <Text style={{ fontSize: 18 }}>Location:</Text>
            <TextInput
              name="Location"
              mode="outlined"
              placeholder="Enter location"
              onChangeText={handleChange("location")}
              onBlur={handleBlur("location")}
              value={values.location}
              activeOutlineColor="#276ef1"
              blurOnSubmit
              outlineColor="#276ef1"
              style={[styles.input, themeTextStyle]}
              theme={{ colors: { text: themeTextStyle } }}
            />

            {touched.location && errors.location && (
              <Text style={styles.errorText}>{errors.location}</Text>
            )}
            <Text style={{ fontSize: 18 }}>Description:</Text>
            <TextInput
              name="description"
              mode="outlined"
              placeholder="Enter task description"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              activeOutlineColor="#276ef1"
              outlineColor="#276ef1"
              blurOnSubmit
              style={styles.input}
              theme={{ colors: { text: themeTextStyle } }}
            />
            {touched.description && errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}
            {/* Start time selector */}
            <Text style={{ fontSize: 18 }}>Start Time:</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Button
                mode="contained"
                uppercase={false}
                style={styles.button}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
                onPress={showDatepicker}
              >
                Select Date
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.button}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
                onPress={showTimepicker}
              >
                Select Time
              </Button>
            </View>
            <Text style={{ fontWeight: "bold", marginBottom: "5%" }}>
              Start time selected:{" "}
              <Text style={{ color: "#276ef1" }}>
                {start_date.toLocaleString()}
              </Text>
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={start_date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
              />
            )}

            {/* End time selector */}

            <Text style={{ fontSize: 18 }}>End Time:</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Button
                mode="contained"
                uppercase={false}
                style={styles.button}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
                onPress={showEndDatepicker}
              >
                Select Date
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.button}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
                onPress={showEndTimepicker}
              >
                Select Time
              </Button>
            </View>
            <Text style={{ fontWeight: "bold", marginBottom: "5%" }}>
              End time selected:{" "}
              <Text style={{ color: "#276ef1" }}>
                {end_date.toLocaleString()}
              </Text>
            </Text>
            {showEnd && (
              <DateTimePicker
                testID="dateTimePicker"
                value={end_date}
                mode={mode}
                is24Hour={true}
                onChange={onChangeEndDate}
              />
            )}

            {/* Priority Select */}

            <Text style={{ fontSize: 18 }}>Task priority:</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Button
                mode="contained"
                uppercase={false}
                style={styles.high}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
                //   onPress={showEndTimepicker}
              >
                High
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.medium}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
                //   onPress={showEndTimepicker}
              >
                Medium
              </Button>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.low}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
                //   onPress={showEndTimepicker}
              >
                Low
              </Button>
            </View>
            {/* Assignee */}
            <Text style={{ fontSize: 18 }}>Assigned To:</Text>
            <Button
              style={{ marginTop: 30 }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              Show
            </Button>
            <UserModal
            
              modalVisible={modalVisible}
              setModalVisible={() => {
                setModalVisible(!modalVisible);
              }}
              employeeData={employees}
            />

            <Button
              onPress={() => {
                save(values);
              }}
              mode="contained"
              loading={props.isSubmitting}
              uppercase={false}
              style={styles.button}
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
export default AddTasks;
