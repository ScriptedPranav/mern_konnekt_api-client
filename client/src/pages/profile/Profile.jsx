import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {axiosInstance} from "../../config";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users/?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);
  return (
    <React.Fragment>
      <Topbar />
      <div className="profile">
        <Sidebar user = {user} />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
