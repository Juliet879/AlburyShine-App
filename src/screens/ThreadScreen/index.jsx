import { Thread, Channel } from "stream-chat-expo";
import { useChatContext } from "../../components/Chat/ChatContext";

const ThreadScreen = ()=>{
    const { channel, thread } = useChatContext();
    return (
        <Channel channel={channel} thread={thread} threadList>
          <Thread />
        </Channel>
      );
}
export default ThreadScreen