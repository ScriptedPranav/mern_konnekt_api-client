import "./post.css";
import { MoreVert, DeleteOutline } from "@mui/icons-material";
import { Box, Button, Typography, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import {axios} from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const PF = "https://konnekt-social.herokuapp.com/images/"
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await axios.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setisLiked(!isLiked);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + post._id, {
        data: { userId: currentUser._id },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
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

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {post.userId === currentUser._id && (
              <>
                <DeleteOutline
                  className="postTopRightDelete"
                  htmlColor="tomato"
                  onClick={handleOpen}
                />
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Do you want to delete this post?
                    </Typography>
                    <Button variant = "contained" onClick = {handleDelete} style = {{backgroundColor:"red"}}>Delete</Button>
                    <Button onClick = {handleClose}>Cancel</Button>
                  </Box>
                </Modal>
              </>
            )}
            <MoreVert />
          </div>
        </div>

        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
