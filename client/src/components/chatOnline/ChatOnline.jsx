import {axiosInstance} from "../../config";
import { useEffect, useState } from "react";
import "./chatOnline.css";

function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = async(user) => {
    try {
      const res = await axiosInstanceInstance.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data)
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axiosInstance.get("/users/friends/" + currentId);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);


  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick = {()=>(handleClick(o))}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src = {o?.profilePicture ? PF+o.profilePicture : PF + "person/noAvatar.png"}
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
