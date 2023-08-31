// Navbar.js
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './Navbar.css'; // Import the CSS file

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const username = auth.currentUser?.displayName;

  return (
    <div className="navbar">
      <div>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link" >Login</Link>
      </div>
      <div className="user-info">
        <p>{username}</p>
        <img src={auth.currentUser?.photoURL || ""} alt="User" />
      </div>
    </div>
  );
};
