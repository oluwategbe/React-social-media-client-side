import Home from "./pages/home/Home";
import Login from "./pages/home/login/Login";
import Profile from "./pages/home/profile/Profile";
import Register from "./pages/home/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Register />} />
        <Route path="/login" exact element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" exact element={user ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/profile/:username" exact element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
