import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      console.log("Server response:", response);
      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem("token"));
        alert("Login successful");
        navigate("/dashboard"); // Redirect to the dashboard route
      } else {
        alert("Please check your email and password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  }

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 style={{ color: 'white' }}>Login</h1>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <p style={{Ncolor: 'white'}}>New user? Register here</p>
        <NavLink to="/register" style={{textDecoration: 'underline', color: 'white'  }}>
          Register 
        </NavLink>
      </form>
      
    </main>
  );
}
