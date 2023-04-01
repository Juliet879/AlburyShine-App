import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import styles from './styles';

const UnauthorizedScreen = ({navigation}) => {
  const  onHandleClick =()=>{
        navigation.replace("Login Screen")
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access Denied</Text>
      <Text style={styles.subtitle}>
        You do not have permission to access this page.
      </Text>
      <Button onPress={onHandleClick}>Login</Button>
    </View>
  );
};



export default UnauthorizedScreen;
