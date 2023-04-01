import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import styles from './styles';

const ProfileDrawer = (props) => {
  const handleButtonPress = () => {
    // Add your custom button action here
    console.log('Custom button pressed');
    // Close the drawer
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Custom Button</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};



export default ProfileDrawer;
