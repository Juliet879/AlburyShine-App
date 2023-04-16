// useChatClient.js

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { STREAM_API_KEY } from '@env';
import Toast from "react-native-root-toast";
import * as SecureStore from 'expo-secure-store';
import { getToken } from '../../../../libraries';

const chatClient = StreamChat.getInstance(STREAM_API_KEY);

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const [token,setToken] = useState();
const [userId,setuserId] = useState();
const [chatToken,setChatToken] = useState();
const [chatName, setChatName] = useState("");

const user = {
    id:userId,
    name:chatName
}
useEffect(()=>{
    (async () => {

        const id = await SecureStore.getItemAsync("id");
        setuserId(id);
        const chatName = await SecureStore.getItemAsync("name");
        setChatName(chatName);
        const messageToken = await getToken(id);
        setChatToken(messageToken)

      })();
  const setupClient = async ()=>{
    try{
        chatClient.connectUser(user,chatToken);
        setClientIsReady(true);
    }
    catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
  }
  if (!chatClient.userID && chatToken !== null && chatToken!== undefined && userId !== null && userId!== undefined) {
    setupClient();
  }

  },[userId,chatToken])


  return {
    clientIsReady,
  };
};
