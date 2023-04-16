// src/chat/StreamChatInstance.js
import { StreamChat } from "stream-chat";
import { STREAM_API_KEY } from '@env';

// Replace with your Stream API key
const apiKey = STREAM_API_KEY;

const streamClient = StreamChat.getInstance(apiKey);

export default streamClient;
