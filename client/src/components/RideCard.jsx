import React, { useState } from "react";
import styles from "./RideCard.module.css";
import MapModal from "./MapModal";

function RideCard({
  ride,
  userRole,
  context,
  onRequestRide,
  onAcceptRide,
  onRejectRide,
}) {
  const [showMapModal, setShowMapModal] = useState(false);

  console.log("Ride time passmmmmmmmmmmmmmmmmmmmmmmmm", ride);
  const handleAcceptRide = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/rides/ride/${ride._id}/accept-request/${ride.rideRequests[0]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ action: "accept" }),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message or update the UI
        alert("Ride accepted successfully");
        if (onAcceptRide) {
          onAcceptRide(); // You can also call a callback function if provided
        }
      } else {
        // Handle API response indicating an error
        alert("Error accepting ride");
      }
    } catch (error) {
      console.error("Error accepting ride:", error);
      alert(
        "An error occurred while accepting the ride. Please try again later."
      );
    }
  };

  const handleRejectRide = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/rides/ride/${ride._id}/accept-request/${ride.rideRequests[0]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ action: "reject" }),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message or update the UI
        alert("Ride rejected successfully");
        if (onRejectRide) {
          onRejectRide(); // You can also call a callback function if provided
        }
      } else {
        // Handle API response indicating an error
        alert("Error rejecting ride");
      }
    } catch (error) {
      console.error("Error rejecting ride:", error);
      alert(
        "An error occurred while rejecting the ride. Please try again later."
      );
    }
  };

  const renderButtons = () => {
    if (context === "search" && userRole === "user") {
      return (
        <div>
          <button
            className={styles.button}
            onClick={onRequestRide}
            style={{ marginRight: "15px" }}
          >
            Request Ride
          </button>
          <button
            className={styles.button}
            onClick={() => setShowMapModal(true)}
          >
            Show Map
          </button>
        </div>
      );
    } else if (context === "myPublished" && userRole === "publisher") {
      return (
        <div>
          <button className={styles.acceptButton} onClick={handleAcceptRide}>
            Accept Ride
          </button>
          <button className={styles.rejectButton} onClick={handleRejectRide}>
            Reject Ride
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        {ride.exactStartLocation} to {ride.exactEndLocation}
      </h2>
      <p>{ride.rideRequests.userDetails}</p>
      <p className={styles.description}>{ride.routeDescription}</p>
      <p className={styles.passengers}>Passengers: {ride.passengers}</p>
      <p className={styles.date}>Date: {ride.date}</p>
      {/* {context !== "myRequested" && (
        <p className={styles.approvalStatus}>
          Approval Status: {ride.approvalStatus}
        </p>
      )} */}
      {renderButtons()}
      {showMapModal && (
        <MapModal ride={ride} onClose={() => setShowMapModal(false)} />
      )}
    </div>
  );
}

export default RideCard;
