import React, { useState ,useEffect} from "react";
import { View } from "react-native";

import ChatComponent from "../../components/Chat/ChatComponent";

import Toast from "react-native-root-toast";
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from "react-native-paper";
import { Text } from "react-native";
import { API_URL } from "@env";

import { getToken } from "../../../libraries";
import styles from "./styles";






const Message =  ()=>{





    return(
     <ChatComponent/>
    )
}

export default Message;

