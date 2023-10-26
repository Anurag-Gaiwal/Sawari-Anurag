import React, { useState } from "react";
import styles from "./PublishRide.module.css";
import axios from "axios";

function PublishRide({ onSubmit }) {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [exactStartLocation, setExactStartLocation] = useState("");
  const [exactEndLocation, setExactEndLocation] = useState("");
  const [routeDescription, setRouteDescription] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [startCoordinates, setStartCoordinates] = useState([]);
  const [endCoordinates, setEndCoordinates] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use a geocoding API to convert startLocation to coordinates
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          exactStartLocation
        )}.json?access_token="Your api token from mapbox api"`
      )
      .then((startResponse) => {
        const startCoordinates =
          startResponse.data.features[0].geometry.coordinates;
        console.log("Start Coordinates:", startCoordinates);
        setStartCoordinates(startCoordinates);

        // Perform geocoding for the end location as well
        axios
          .get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              exactEndLocation
            )}.json?access_token="Your api token from mapbox api"`
          )
          .then((endResponse) => {
            const endCoordinates =
              endResponse.data.features[0].geometry.coordinates;
            console.log("End Coordinates:", endCoordinates);
            setEndCoordinates(endCoordinates);

            // Create a new object with coordinates
            const myRide = {
              startLocation,
              destination,
              routeDescription,
              date,
              passengers,
              exactStartLocation,
              exactEndLocation,

              startCoordinates,
              endCoordinates,
            };

            // Make a POST request to your API endpoint
            fetch("http://localhost:3000/api/v1/rides/Ride", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token"), // Include the authentication token if required
              },
              body: JSON.stringify(myRide),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(`Data after storing ride ${data}`);
                if (data.status === "ok") {
                  // Handle success
                  console.log("Ride published successfully!");
                  alert("Ride published succesfully");

                  // You can also reset the form fields if needed
                  setStartLocation("");
                  setDestination("");
                  setExactStartLocation("");
                  setExactEndLocation("");
                  setRouteDescription("");
                  setDate("");
                  setPassengers("");
                  setStartCoordinates([]);
                  setEndCoordinates([]);
                } else {
                  // Handle errors from the API response
                  console.error("Failed to publish ride:", data.message);
                }
              })
              .catch((error) => {
                // Handle network or other errors
                console.error("Error publishing ride:", error);
              });
          })
          .catch((endError) => {
            console.error("Geocoding error for end location:", endError);
          });
      })
      .catch((startError) => {
        console.error("Geocoding error for start location:", startError);
      });
  };

  return (
    <div className={styles.transparentFormContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <select
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          style={{
            padding: "5px", // Add padding
            fontSize: "16px", // Set font size
            border: "1px solid #ccc", // Add a border
            borderRadius: "5px", // Add rounded corners
            width: "200px", // Set the width
            backgroundColor: "#f0f0f0", // Set the background color
            color: "black",
            fontFamily: "Times new Roman",
          }}
        >
          <option value="">Select Start city</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Thane">Thane</option>
          <option value="Kalyan">Kalyan</option>
          <option value="Dombivili">Dombivili</option>
          <option value="Pune">Pune</option>
          {/* Add more options as needed */}
        </select>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{
            padding: "5px", // Add padding
            fontSize: "16px", // Set font size
            border: "1px solid #ccc", // Add a border
            borderRadius: "5px", // Add rounded corners
            width: "200px", // Set the width
            backgroundColor: "#f0f0f0", // Set the background color
            color: "black",
            fontFamily: "Times new Roman",
          }}
        >
          <option value="">Select Destination city</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Thane">Thane</option>
          <option value="Kalyan">Kalyan</option>
          <option value="Dombivili">Dombivili</option>
          <option value="Pune">Pune</option>
          {/* Add more options as needed */}
        </select>
        <input
          style={{ color: "white" }}
          type="text"
          placeholder="Source Landmark"
          value={exactStartLocation}
          onChange={(e) => setExactStartLocation(e.target.value)}
        />
        <input
          style={{ color: "white" }}
          type="text"
          placeholder="Destination Landmark"
          value={exactEndLocation}
          onChange={(e) => setExactEndLocation(e.target.value)}
        />
        <textarea
          style={{
            padding: "5px", // Add padding
            fontSize: "16px", // Set font size
            border: "1px solid #ccc", // Add a border
            borderRadius: "5px", // Add rounded corners
            width: "200px", // Set the width
            backgroundColor: "#f0f0f0", // Set the background color
            color: "black",
            fontFamily: "Times new Roman",
          }}
          placeholder="Route Description"
          value={routeDescription}
          onChange={(e) => setRouteDescription(e.target.value)}
        ></textarea>
        <input
          style={{
            color: "white",
          }}
          type="date"
          placeholder="Date"
          className={styles.date}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          style={{ color: "white" }}
          type="number"
          placeholder="0"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />
        <button type="submit">Publish ride</button>
      </form>
      <img
        style={{
          float: "right",
          top: "-34rem",
          left: "59rem",
          backgroundColor: "#FFFFDD",
        }}
        src="/carpoolOpenDoor.png"
        alt="Background"
        className={styles.backgroundCar}
      />
    </div>
  );
}

export default PublishRide;
