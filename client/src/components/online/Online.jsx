import "./online.css";

export default function Online({user}) {
  const PF = "https://konnekt-social.herokuapp.com/images/"
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          src = {user.profilePicture ? PF+ user.profilePicture : PF + "person/noAvatar.png"}
          alt=""
          className="rightbarProfileImg"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
