import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = ({ userList }) => {
  const [value, setValue] = useState("");
  const handleSearch = (event) => {
    setValue(event.target.value);
  };
  const PF = "https://konnekt-social.onrender.com/images/"

  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        list="users"
        className="searchInput"
        placeholder="Search for people"
      />
      <div className="dropDown">
        <div>
          {userList
            .filter(
              (item) =>
                item.username
                  .toLowerCase()
                  .includes(value.toLocaleLowerCase()) && value !== ""
            )
            .map((item, idx) => (
              <Link to={`/profile/${item.username}`} style={{textDecoration:"none",color:"black"}}>
                <div className="dropBox" key={idx}>
                  <img
                    src={
                      item.profilePicture
                        ? PF + item.profilePicture
                        : PF + "person/noAvatar.png"
                    }
                  />
                  <div>{capitalizeFirstLetter(item.username)}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
