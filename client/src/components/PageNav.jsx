import React, { useState, useEffect } from "react";
import styles from "./PageNav.module.css"; // Import the CSS module
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function PageNav() {
  // State to track the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check the user's login status when the component mounts
  useEffect(() => {
    // You can check the user's login status using your authentication logic here
    // For example, check if a token exists in localStorage or if the user is authenticated in some other way
    const token = localStorage.getItem("token"); // Change this to match your authentication logic
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Remove the user's token from localStorage
    localStorage.removeItem("token");

    // Update the login status
    setIsLoggedIn(false);

    // Redirect to the login page or another appropriate page
    window.location.href = "/login"; // Change the URL as needed
  };

  return (
    <>
      <nav className={styles.nav}>
        <Logo />
        <ul>
          <li className="nav">
            {isLoggedIn ? (
              // If the user is logged in, show the link to "/dashboard"
              // <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/dashboard">Home</NavLink>
            ) : (
              // If the user is not logged in, show the link to "/"
              <NavLink to="/">Home</NavLink>
            )}
          </li>
          <li>
            <NavLink to="/publish-a-ride">Publish-a-ride</NavLink>
          </li>
          <li>
            <NavLink to="/MyPublishedRides">My Published Rides</NavLink>
          </li>
          <li>
            <NavLink to="/MyRequestedRides">My Requested Rides</NavLink>
          </li>
          <li>
            <NavLink to="/search-a-ride">Search-a ride</NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              // If the user is logged in, show the "Logout" button
              <button onClick={handleLogout} className="logout-button">Logout</button>
            ) : (
              // If the user is not logged in, show the "Login" link
              <NavLink to="/login" className={styles.ctaLink}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default PageNav;
