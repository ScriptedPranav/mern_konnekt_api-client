import { Link } from "react-router-dom";
import "./friend.css";

export default function Friend({ friend }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link
      to={`/profile/${friend?.username}`}
      style={{ textDecoration: "none" , color: "black", fontWeight : "500"}}
    >
      <li className="sidebarFriend">
        <img
          src={
            friend.profilePicture
              ? PF + friend.profilePicture
              : PF + "/person/noAvatar.png"
          }
          alt=""
          className="sidebarFriendImg"
        />
        <span className="sidebarFriendName">{friend.username}</span>
      </li>
    </Link>
  );
}
