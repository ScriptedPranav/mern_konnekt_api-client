import {RssFeed,Chat,PlayCircle,Group,Bookmark,HelpOutline,WorkOutline,Event,School} from "@mui/icons-material"
import Friend from "../friend/Friend"
import "./sidebar.css"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import {axiosInstance} from "../../config"

export default function Sidebar({user}) {
  const [friends, setFriends] = useState(null);
  const {user:currentUser} = useContext(AuthContext);

  useEffect(()=>{
    const getFriends = async() => {
      try {
        const res = await axiosInstance.get("users/friends/"+ currentUser._id);
        setFriends(res.data);
      }catch(err) {
        console.log(err)
      }
    }
    getFriends();
  },[currentUser._id])

  console.log(friends)

  return (
    <div className = "sidebar">
      <div className="sidebarWrapper">
        
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className = "sidebarIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className = "sidebarIcon"/>
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircle className = "sidebarIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className = "sidebarIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className = "sidebarIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className = "sidebarIcon"/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className = "sidebarIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className = "sidebarIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className = "sidebarIcon"/>
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>

        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {friends?.map(friend=>(
            <Friend key = {friend._id} friend = {friend} />
          ))}
        </ul>
      </div>
    </div>
  )
}
