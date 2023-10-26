import PageNav from "../components/PageNav";
import React, { useState, useEffect } from "react";
import MyRequestedRideCard from "../components/MyRequestedRideCard";

function MyRequestedRides() {
  const [requestedRides, setRequestedRides] = useState([]);
  const [userId, setUserId] = useState();

  // Fetch the requested rides from the backend API
  const fetchRequestedRides = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/rides/my-requested-rides",
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
          setRequestedRides(data.data.rides);
          console.log("Hellooghgghhgfhgfgfgg", data.data.userId);
          setUserId(data.data.userId);
        } else {
          alert("Error fetching requested rides");
        }
      } else {
        alert("Network error. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching requested rides:", error);
      alert(
        "An error occurred while fetching requested rides. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchRequestedRides();
  }, []);

  return (
    <>
      <PageNav />
      <div>
        <h2 style={{ textAlign: "center", padding: "90px 0px 10px 0px" }}>
          My Requested Rides
        </h2>{" "}
        <div>
          {requestedRides.map((ride, index) => (
            <MyRequestedRideCard key={index} ride={ride} userId={userId} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyRequestedRides;
