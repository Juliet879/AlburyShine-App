import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";

const CreateChannel = ({ user, onCreateChannel }) => {
    
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(
        selectedUsers.filter((id) => id !== userId)
      );
    } else {
      setSelectedUsers([...selectedUsers,userId]);
    }
  };

  const handleSubmit = () => {
    onCreateChannel(selectedUsers);
  };
  if (!user || user.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No users available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create a new channel</Text>
      {user.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={styles.checkboxContainer}
          onPress={() => handleCheckboxChange(user.id)}
        >
          <View
            style={[
              styles.checkbox,
              selectedUsers.includes(user.id)
                ? styles.checked
                : styles.unchecked,
            ]}
          />
          <Text style={styles.label}>{user.name}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Create Channel" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#999",
  },
  checked: {
    backgroundColor: "#999",
  },
  unchecked: {
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
  },
});

export default CreateChannel;
