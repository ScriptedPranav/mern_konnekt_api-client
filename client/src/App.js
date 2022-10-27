import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

export const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Register />} />

      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />

      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route
        path="/messenger"
        element={!user ? <Navigate to="/" /> : <Messenger/>}
      />

      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  );
};

export default App;
