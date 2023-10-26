

import React, { useState, useEffect } from "react";
import styles from "./MyRequestedRideCard.module.css";

function MyRequestedRideCard({ ride, userId }) {
  const [userDetails, setUserDetails] = useState(null);
  const [currentUserStatus, setCurrentUserStatus] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState(null);

  const getUserDetails = async () => {
    const currentUserStatus = ride.rideRequests.find(
      (request) => request._id === userId
    )?.currentStatus;
    setCurrentUserStatus(currentUserStatus);
    // console.log("ggggggggg", ride.rideRequests[0].userDetails);
    // const passengerDetails = ride.rideRequests.find(
    //   (request) => request._id === userId
    // )?.userDetails;
    // setCurrentUserStatus(currentUserStatus);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/rides/user/${ride.user}`,
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
          // Here, you can use the user data as needed.
          const userData = data.data.user;
          setUserDetails(userData);
          // Log the user's data
          console.log("User Data:", userData);

          // Now, you can set the user data to the state or use it as needed.
        } else {
          alert("Error fetching user data");
        }
      } else {
        alert("Network error. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert(
        "An error occurred while fetching user data. Please try again later."
      );
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div className={styles.card}>
        {/* <h2>Ride Details</h2> */}
        <h3>Requested Ride Details</h3>
        <h2 className={styles.title}>
          {ride.exactStartLocation} to {ride.exactEndLocation}
        </h2>
        <p>Route Description: {ride.routeDescription}</p>
        <p>Passengers: {ride.passengers}</p>
        <p>Date: {ride.date}</p>

        {currentUserStatus === 1 && userDetails && (
          <>
            <p>Ride publisher Phone Number: {userDetails.phoneno}</p>
            <p>Ride publisher Name :{userDetails.name}</p>
          </>
        )}
        <p>
          Current Status:{" "}
          {currentUserStatus === 0
            ? "Pending"
            : currentUserStatus === 1
            ? "Ride Accepted"
            : currentUserStatus === 2
            ? "Ride Rejected"
            : "Loading..."}
        </p>
      </div>
    </>
  );
}

export default MyRequestedRideCard;
