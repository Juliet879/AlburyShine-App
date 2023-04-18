import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  useColorScheme,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";
import {
  TextInput,
  Button,
  Modal,
  Portal,
  Avatar,
  Divider,
  SegmentedButtons,
} from "react-native-paper";
import { API_URL } from "@env";
import moment from "moment";

import Toast from "react-native-root-toast";
import styles from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import UserModal from "../../components/EmployeesModal";

const AddTasks = ({ navigation }) => {
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showEnd, setEndTimeShow] = useState(false);
  const [token, setToken] = useState();
  const [employees, setEmployees] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [priority, setPriority] = useState("");
  const [value, setValue] = useState("");
  const [breakTime, setBreakTime] = useState(new Date());
  const [showBreakPicker, setShowBreakPicker] = useState(false);

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
      .then((response) => {
        console.log("het", response.status);
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
          console.log({ response });
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
        console.log(response.data);
        setEmployees(response.data);
        // response.data ? setEmployees(response.data) : setEmployees([]);
        setIsLoading(true);
      })
      .catch((error) => {
        console.log({ error });
        Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);

    setStartDate(currentDate);

    console.log("mh", start_date.toString());
  };
  const onChangeEndDate = (event, selectedDate) => {
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

  const selectedEmployees = (employee) => {
    console.log("employee", employee);
    setSelectedEmployee(employee);
  };

  const onChangeBreak = (event, selectedTime) => {
    const currentTime = selectedTime || breakTime;
    setShowBreakPicker(false);
    setBreakTime(currentTime);
  };

  console.log({ selectedEmployee });

  const colorScheme = useColorScheme();
  const themeTextStyle =
    colorScheme === "light" ? styles.lightTextColor : "#000000";
  const buttonTextStyle =
    colorScheme === "light" ? styles.lightButtonColor : styles.darkButtonColor;
  const labelTextStyle =
    colorScheme === "light" ? styles.lightTextColor : styles.lightTextColor;

  const tasksValidationSchema = yup.object().shape({
    location: yup.string().required("Location is required"),
    description: yup.string().required("Description is required"),
    assigneeId: yup
      .array()
      .min(1, "At least one assignee is needed")
      .required("Assignee is required"),
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
    // password: yup.string().required("Password is required"),
  });
  const handleSubmit = (values, formikActions) => {
    console.log(values);
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    try {
      fetch(`${API_URL}/employers/add-task`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(values),
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
          formikActions.setSubmitting(true);
          console.log(response);
          if (response.status === 200) {
            Toast.show(response.message, {
              duration: Toast.durations.LONG,
            });
            navigation.navigate("BottomNav");
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
    <View style={styles.container}>
      <StatusBar backgroundColor={"#276EF1"} barStyle="light-content" />
      <Text style={styles.title}>Add Task</Text>
      <ScrollView>
      <Formik
        // validationSchema={tasksValidationSchema}
        initialValues={{
          location: "",
          startTime: start_date,
          endTime: end_date,
          description: "",
          priority: "",
          assigneeId: employees,
          rate: "",
          breakTime: breakTime,
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
          setFieldValue,
          ...props
        }) => {
          useEffect(() => {
            setFieldValue("startTime", start_date.toString());
            setFieldValue("endTime", end_date.toString());
            setFieldValue("assigneeId", selectedEmployee);
            setFieldValue("breakTime", breakTime);
          }, [
            start_date,
            setFieldValue,
            end_date,
            selectedEmployee,
            breakTime,
          ]);
          return (
            <>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Location:
              </Text>
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
                textColor={themeTextStyle}
              />

              {touched.location && errors.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Description:
              </Text>
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
                textColor={themeTextStyle}
              />
              {touched.description && errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}
              {/* Start time selector */}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Start Time:
                </Text>
                <Button
                  mode="outlined"
                  uppercase={false}
                  style={styles.button}
                  textColor="#276EF1"
                  labelStyle={labelTextStyle}
                  onPress={showDatepicker}
                >
                  Select Date
                </Button>
                <Button
                  mode="outlined"
                  uppercase={false}
                  style={styles.button}
                  textColor="#ffffff"
                  labelStyle={labelTextStyle}
                  onPress={showTimepicker}
                >
                  Select Time
                </Button>
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: "5%",
                  fontStyle: "italic",
                  color: "grey",
                }}
              >
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

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  End Time:
                </Text>
                <Button
                  mode="outlined"
                  uppercase={false}
                  style={styles.button}
                  textColor="#ffffff"
                  labelStyle={labelTextStyle}
                  onPress={showEndDatepicker}
                >
                  Select Date
                </Button>
                <Button
                  mode="outlined"
                  uppercase={false}
                  style={styles.button}
                  textColor="#ffffff"
                  labelStyle={labelTextStyle}
                  onPress={showEndTimepicker}
                >
                  Select Time
                </Button>
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: "5%",
                  fontStyle: "italic",
                  color: "grey",
                }}
              >
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
              {/* Breaktime */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Break Time:
                </Text>
                <Button
                  mode="outlined"
                  uppercase={false}
                  style={styles.button}
                  textColor="#ffffff"
                  labelStyle={labelTextStyle}
                  onPress={() => setShowBreakPicker(true)}
                >
                  Select Break Time
                </Button>
                {showBreakPicker && (
                  <DateTimePicker
                    testID="breakTimePicker"
                    value={breakTime}
                    mode="time"
                    is24Hour={true}
                    onChange={onChangeBreak}
                  />
                )}
              </View>
              <Text
                style={{
                  fontWeight: "bold",
                  marginBottom: "5%",
                  fontStyle: "italic",
                  color: "grey",
                }}
              >
                Break time selected:{" "}
                <Text style={{ color: "#276ef1" }}>
                  {breakTime.toLocaleString()}
                </Text>
              </Text>
              {/* {Hourly rate} */}
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Hourly Rate:
              </Text>
              <TextInput
                value={values.rate}
                onChangeText={handleChange("rate")}
                placeholder="Enter hourly rate"
                keyboardType="numeric"
                activeOutlineColor="#276ef1"
                blurOnSubmit
                outlineColor="#276ef1"
                mode="outlined"
                style={[styles.input, themeTextStyle]}
                theme={{ colors: { text: themeTextStyle } }}
                textColor={themeTextStyle}
              />
              {/* Priority Select */}

              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Task priority:
              </Text>
              <View>
                <SegmentedButtons
                  value={values.priority}
                  onValueChange={handleChange("priority")}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  buttons={[
                    {
                      value: "high",
                      label: "High",
                      style: styles.high,
                    },
                    {
                      value: "medium",
                      label: "Medium",
                      style: styles.medium,
                    },
                    { value: "low", label: "Low", style: styles.low },
                  ]}
                />
              </View>
              {touched.assigneeId && errors.assigneeId && (
                <Text style={styles.errorText}>{errors.assigneeId}</Text>
              )}
              {/* Assignee */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Assigned To:
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: "#276ef1",
                    }}
                  >
                    See Employees
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.containerDetails}>
                {employees.map((item) =>
                  selectedEmployee.map((item2) =>
                    item.id === item2 ? (
                      <>
                        <Avatar.Icon size={30} icon="account" />
                        <Text style={styles.details}>
                          {item.firstName} {item.lastName}
                        </Text>
                        <Divider />
                      </>
                    ) : null
                  )
                )}
              </View>

              <UserModal
                modalVisible={modalVisible}
                setModalVisible={() => {
                  setModalVisible(false);
                }}
                employeeData={employees}
                selectedEmployees={(employees) => selectedEmployees(employees)}
              />

              <Button
                onPress={handleSubmit}
                mode="contained"
                loading={props.isSubmitting}
                uppercase={false}
                style={styles.submit}
                disabled={!isValid}
                textColor="#ffffff"
                labelStyle={buttonTextStyle}
              >
                Add Task
              </Button>
            </>
          );
        }}
      </Formik>
      </ScrollView>
    </View>
  );
};
export default AddTasks;
