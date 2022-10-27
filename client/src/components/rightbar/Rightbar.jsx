import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {axiosInstance} from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove, Edit } from "@mui/icons-material";
import { io } from "socket.io-client";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?._id));
  }, [currentUser, user?._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        if (user) {
          const friendList = await axiosInstance.get("/users/friends/" + user?._id);
          setFriends(friendList.data);
        } else {
          const userFriendList = await axiosInstance.get(
            "/users/friends/" + currentUser._id
          );
          setUserFriends(userFriendList.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, currentUser]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        currentUser.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser]);

  useEffect(() => {
    setOnlineFriends(userFriends.filter((f) => onlineUsers.includes(f._id)));
  }, [userFriends, onlineUsers]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axiosInstance.put("/users/" + user?._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } else {
        await axiosInstance.put("/users/" + user?._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Niku Singh</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img src="/assets/ad.jpg" alt="" className="rightbarAd" />

        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="rightbarFriendList">
          {onlineFriends.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user?.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">
          User Information
          {user?._id === currentUser._id && (
            <Edit className="rightbarEdit" fontSize="small" />
          )}
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>

            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>

            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", textAlign: "center" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  console.log(followed);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
