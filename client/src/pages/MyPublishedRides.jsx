import PageNav from "../components/PageNav";
import React, { useState, useEffect } from "react";
import MyPublishedRideCard from "../components/MyPublishedRideCard";
import styles from "./MyPublishedRides.module.css";

function MyPublishedRides() {
  const [publishedRides, setPublishedRides] = useState([]);

  // Fetch the published rides from the backend API
  const fetchPublishedRides = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/rides/my-published-rides",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === "ok") {
          setPublishedRides(data.data.rides);
        } else {
          alert("Error fetching published rides");
        }
      } else {
        alert("Network error. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching published rides:", error);
      alert(
        "An error occurred while fetching published rides. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchPublishedRides();
    console.log("hiiiiiiiiiisghfhfgfgfgf", publishedRides);
  }, []);
  return (
    <>
      <PageNav />
      <div>
        <h2 style={{ textAlign: "center", padding: "90px 0px 10px 0px" }}>
          My Published Rides
        </h2>
        <div className={styles.myPublishedRidesContainer}>
          {publishedRides.map((ride, index) => (
            // <div key={index} className={styles.myPublishedRideCard}>
            <div key={index} className={styles.myPublishedRideCard}>
              <MyPublishedRideCard ride={ride} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyPublishedRides;
