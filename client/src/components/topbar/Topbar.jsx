import "./topbar.css";
import { Person, Chat, Notifications, Logout } from "@mui/icons-material";
import { Box, Button, Typography, Modal, Popover } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {axiosInstance} from "../../config";
import SearchBar from "./SearchBar";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const PF = "https://konnekt-social.onrender.com/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axiosInstance.get("/users/all");
        setUserList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const Open = Boolean(anchorEl);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Konnekt</span>
        </Link>
      </div>

      <SearchBar userList={userList} />

      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <span
            className="topbarLinkLogout"
            onClick={handleOpen}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            {user && <Logout fontSize="large" />}
          </span>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={Open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography sx={{ p: 1 }}>Logout?</Typography>
          </Popover>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Do you want to Logout ?
              </Typography>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              </Link>
              <Button onClick={handleClose}>Cancel</Button>
            </Box>
          </Modal>
        </div>

        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link
              to="/messenger"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Chat />
              <span className="topbarIconBadge">1</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            className="topbarImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/noAvatar.png"
            }
            alt="ProfilePicture"
          ></img>
        </Link>
      </div>
    </div>
  );
}
