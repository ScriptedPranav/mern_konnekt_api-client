import {axiosInstance} from "../../config";
import { useEffect, useState } from "react";
import "./conversation.css";

function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = "https://konnekt-social.onrender.com/images/"

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/users?userId=" + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    getUser();
  }, [currentUser,conversation]);
  return (
    <div className="conversation">
      <img
        src={user?.profilePicture ? PF+ user?.profilePicture : PF+"person/noAvatar.png"}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
