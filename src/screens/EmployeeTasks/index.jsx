import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import {
  Avatar,
  Card,
  Divider,
  List,
  Button,
  ActivityIndicator,
  Chip,
} from "react-native-paper";
import { API_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import styles from "./styles";
import TaskModal from "../../components/TaskModal";
import * as Location from "expo-location";
import { reverseGeocode } from "../../../libraries";

const getColorBasedOnText = (text) => {
  // Replace this with your own logic to determine color based on text
  if (text.includes("Completed")) {
    return "green";
  } else if (text.includes("Not started")) {
    return "red";
  } else {
    return "orange";
  }
};
//   Getting the chip colors
export const TextBasedColorChip = ({ text }) => {
  const chipColor = getColorBasedOnText(text);

  return (
    <Chip
      style={{ backgroundColor: "transparent" }}
      textStyle={{ color: chipColor }}
      mode="outlined"
    >
      {text}
    </Chip>
  );
};

const EmployeeTasks = ({ navigation }) => {
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState();
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [employees, setEmployees] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [location, setLocation] = useState();
  const [refresh, setRefresh] = useState(false);

  const getLocation = async () => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert(
          "Permission to access location was denied. You need to allow for location to be able to start a task"
        );
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const formattedAddress = await reverseGeocode(latitude, longitude);
      setLocation(formattedAddress);
    } catch (error) {
      Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
    }
  };

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
        return response.json();
      })
      .then(async (response) => {
        if (response.success === false) {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }

        setEmployees(response.data);
        // response.data ? setEmployees(response.data) : setEmployees([]);
        setIsLoading(true);
      })
      .catch((error) => {
        Toast.show(`${error.message}`, { duration: Toast.durations.LONG });
      });
  };

  const getTasks = () => {
    const headers = {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    fetch(`${API_URL}/employees/all-tasks`, {
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

        setTasks(response.data);
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

    if (token !== null && token !== undefined) {
      getTasks();
      getEmployees();
    }
  }, [token,refresh]);

  const handleStartTask = async (id) => {

    getLocation();
    const values = {
      taskId: id,
      assigneeId: employeeId,
      location: location,
      startTime: new Date(),
    };

    fetch(`${API_URL}/employees/start-task`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status === 200) {
          Toast.show(response.message, {
            duration: Toast.durations.LONG,
          });
        } else {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((error) => {
        Toast.show(error.message, { duration: Toast.durations.LONG });
      });
  };

  const handleEndTask = async (id) => {
    getLocation();
    const values = {
      taskId: id,
      assigneeId: employeeId,
      location: location,
      endTime: new Date(),
    };

    fetch(`${API_URL}/employees/end-task`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status === 200) {
          Toast.show(response.message, {
            duration: Toast.durations.LONG,
          });
        } else {
          Toast.show(response.error, {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch((error) => {
        Toast.show(error.message, { duration: Toast.durations.LONG });
      });
  };
  const getColorBasedOnTask = (text) => {
    // Replace this with your own logic to determine color based on text
    if (text.includes("Start task")) {
      return "red";
    } else if (text.includes("End task")) {
      return "green";
    } else {
      return "orange";
    }
  };

  const TextTaskBasedColorChip = ({ text, id, getLocation }) => {
    if (text === "Not started") {
      text = "Start task";
    } else if (text === "In progress") {
      text = "End task";
    } else {
      text = "Success";
    }
    const chipColor = getColorBasedOnTask(text);
    const onPressFunction = () => {
      if (chipColor === "red") {
        handleStartTask(id, getLocation);
      } else if (chipColor === "green") {
        handleEndTask(id, getLocation);
      }
        setRefresh(!refresh);
    };
  
    return (
      <Chip
        style={{ backgroundColor: chipColor }}
        textStyle={{ color: "#ffffff" }}
        onPress={onPressFunction}
      >
        {text}
      </Chip>
    );
  };

  const completedTasks = () => {
    return tasks.filter((item) => item.status === "Completed");
  };

  const completed = tasks.length >= 1 ? completedTasks() : null;
  const inCompleteTasks = () => {
    return tasks.filter((item) => item.status === "Not started");
  };

  const inProgressTaks = () => {
    return tasks.filter((item) => item.status === "In progress");
  };
  const inProgress = tasks.length >= 1 ? inProgressTaks() : null;

  const inComplete = tasks.length >= 1 ? inCompleteTasks() : null;
  if (loading !== true) {
    return (
      <>
        <ActivityIndicator
          animating={true}
          color="#276EF1"
          size="large"
          style={styles.activity}
        />
        <Text style={styles.activityText}>Loading ...</Text>
      </>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={styles.title}>Tasks Overview</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Card.Title
          style={styles.completed}
          title={
            <Text style={styles.cards}>
              {Array.isArray(completed) && completed.length >= 1
                ? completed.length
                : 0}
            </Text>
          }
          subtitle={<Text style={styles.cardSub}>Completed </Text>}
          left={(props) => (
            <Avatar.Icon {...props} icon="folder" style={styles.icons} />
          )}
        />
        <Card.Title
          style={styles.incomplete}
          title={
            <Text style={styles.cards}>
              {Array.isArray(inComplete) && inComplete.length >= 1
                ? inComplete.length
                : 0}
            </Text>
          }
          subtitle={<Text style={styles.cardSub}>Incomplete </Text>}
          left={(props) => (
            <Avatar.Icon {...props} icon="folder" style={styles.icons} />
          )}
        />
        <Card.Title
          style={styles.inprogress}
          title={
            <Text style={styles.cards}>
              {Array.isArray(inProgress) && inProgress.length >= 1
                ? inProgress.length
                : 0}
            </Text>
          }
          subtitle={<Text style={styles.cardSub}>InProgress </Text>}
          left={(props) => (
            <Avatar.Icon {...props} icon="folder" style={styles.icons} />
          )}
        />
      </View>
      <ScrollView>
        <SafeAreaView>
          <Text style={styles.heading}>Tasks</Text>
          {tasks.length === 0 ? (
            <Text>No tasks</Text>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.taskId}
              key={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity
                    key={item.taskId}
                    style={{ width: "40%" }}
                    onPress={() => {
                      setSelectedId(item.taskId);
                      setModalVisible(true);
                      setSelectedData(item);
                    }}
                  >
                    <List.Item
                      title={
                        <Text style={{ color: "#333235" }}>
                          {item.description}
                        </Text>
                      }
                    />
                  </TouchableOpacity>

                  <List.Item
                    right={() => (
                      <>
                        <TextBasedColorChip text={item.status} />
                      </>
                    )}
                  />

                  <List.Item
                    right={() => (
                      <>
                        <TextTaskBasedColorChip
                          text={
                            item.status && item.status !== "Completed"
                              ? item.status
                              : null
                          }
                          id={item.id}
                          getLocation={getLocation}
                        />
                      </>
                    )}
                  />
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </ScrollView>

      <TaskModal
        employees={employees}
        tasksData={selectedData}
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        onPress={() => setModalVisible(false)}
      />
    </View>
  );
};
export default EmployeeTasks;
