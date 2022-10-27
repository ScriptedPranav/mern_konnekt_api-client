import { useRef, useContext } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#11cb5f",
      },
    },
  });

  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Gossip</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Gossip.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              className="loginInput"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton" disabled = {isFetching}>
              {isFetching ? (
                <ThemeProvider theme={theme}>
                  <CircularProgress color="primary" size="25px" />
                </ThemeProvider>
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <button className="loginRegisterButton">
              Create a new Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
