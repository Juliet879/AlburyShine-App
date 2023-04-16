import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal,Button } from "react-native";
import { useChatContext } from "../ChatContext";
import { FAB, ActivityIndicator } from "react-native-paper";
import { StreamChat } from "stream-chat";
import { ChannelList, ChannelPreviewMessenger } from "stream-chat-expo";
import { STREAM_API_KEY,STREAM_API_SECRET } from "@env";
import * as SecureStore from "expo-secure-store";
import CreateChannel from "../CreateChannel";
import Toast from "react-native-root-toast";
import styles from "./styles";

const chatClient = StreamChat.getInstance(STREAM_API_KEY);
const client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);
const ChannelListings = (props) => {
  const { setChannel, channel } = useChatContext();
  const [userId, setuserId] = useState();
  const [token, setToken] = useState();
  const [loading, setIsLoading] = useState();
  const [users, setUsers] = useState([]);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);



  useEffect(() => {
    (async () => {

      const id = await SecureStore.getItemAsync("id");
      setuserId(id);
    })();
    async function listUsers() {
      try {
        const filters = {}; // Empty filter to get all users.
        const sort =  [{ field: 'created_at', direction: -1 }] // Sort by creation time, descending.
    
        const response = await client.queryUsers(filters,  { limit: 20, offset: 0 });
    
        const users = response.users;
        setUsers(users)
      } catch (error) {
        throw new Error('Error fetching users:', error);
      }
    }
    listUsers()


  }, [userId]);

  const filters = {
    members: {
      $in: [userId],
    },
  };
  const sort = {
    last_message_at: -1,
  };
  if (userId === null || userId === undefined) {
    return <Text>Loading ...</Text>;
  }
  const handleCreateChannel = async (userIds) => {

    try {
      const newChannel = chatClient.channel("messaging", {
        members: [userId, userIds[0]],
      });

      await newChannel.watch();
      setChannel(newChannel);

      setIsCreateChannelModalOpen(false);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };
  const CustomListItem = (props) => {
    const { unread } = props;
    const backgroundColor = unread ? "#e6f7ff" : "#fff";
    return (
      <View style={{ backgroundColor }}>
        <ChannelPreviewMessenger {...props} />
      </View>
    );
  };
  return (
    <>
    <Modal
        animationType="slide"
        transparent={false}
        visible={isCreateChannelModalOpen}
      >
        <View style={{ flex: 1 }}>
       
          <CreateChannel
            user={users}
            onCreateChannel={handleCreateChannel}
          />
             <Button
            title="Close"
            onPress={() => setIsCreateChannelModalOpen(false)}
          />
        </View>
      </Modal>
      <ChannelList
        Preview={CustomListItem}
        onSelect={(channel) => {
          const { navigation } = props;
          setChannel(channel);
          navigation.navigate("Chat");
        }}
        filters={filters}
        sort={sort}
      />
      <FAB
        icon="message-plus"
        style={styles.fab}
        onPress={() => setIsCreateChannelModalOpen(true)}
      />
    </>
  );
};



export default ChannelListings;
