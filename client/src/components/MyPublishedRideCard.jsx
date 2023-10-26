import React from "react";
import styles from "./MyPublishedRideCard.module.css";

function MyPublishedRideCard({ ride }) {
  console.log("HEloo ride ", ride);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time part to midnight

  const handleAccept = async (requestId) => {
    console.log("hellllllllllllllllo", requestId);
    console.log("Rideeeeeeeeeeeeeee", ride._id);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/rides/ride/${ride._id}/accept-request/${requestId}`,
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
        alert("Requsest accepted successfully ");
        console.log("Request accepted successfully");
        // You may want to update the local state or UI here
      } else {
        // Handle API response indicating an error
        console.error("Error accepting request");
        // Show an error message or handle the error
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      // Show an error message or handle the error
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/rides/ride/${ride._id}/accept-request/${requestId}`,
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
        alert("Requsest rejected successfully ");

        console.log("Request rejected successfully");
        // You may want to update the local state or UI here
      } else {
        // Handle API response indicating an error
        console.error("Error rejecting request");
        // Show an error message or handle the error
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      // Show an error message or handle the error
    }
  };
  // ride.rideRequests.forEach((request, index) => {
  //   console.log("hellllllllllllllllo", request._id);
  // });

  return (
    <>
      <div className={styles.card}>
        <h2>Ride Details</h2>
        <br></br>
        {ride.rideRequests.map((request, index) => {
          const rideDate = new Date(ride.date);
          if (rideDate <= today) {
            // Ride date is before or equal to today
            return (
              <div key={index} className={styles.mainCard}>
                <h3>Request from {request.userDetails.name}</h3>
                <h2 className={styles.title}>
                  {ride.exactStartLocation} to {ride.exactEndLocation}
                </h2>
                <p>Passenger email: {request.userDetails.email}</p>
                <p>Route description: {ride.routeDescription}</p>
                <p>Ride Date: {ride.date}</p>
                <p>Ride Expired</p>
              </div>
            );
          } else {
            // Ride date is in the future, allow accept/reject
            return (
              <div key={index} className={styles.mainCard}>
                <h3>Request from {request.userDetails.name}</h3>
                <h2 className={styles.title}>
                  {ride.exactStartLocation} to {ride.exactEndLocation}
                </h2>
                <p>Passenger email: {request.userDetails.email}</p>
                <p>Route description: {ride.routeDescription}</p>
                <p>Ride Date: {ride.date}</p>
                {request.currentStatus === 0 && (
                  <>
                    <p>Approval status: Pending</p>
                    <button
                      onClick={() => handleAccept(request._id)}
                      style={{ margin: "0px 10px 0px 0px" }}
                    >
                      Accept
                    </button>
                    <button onClick={() => handleReject(request._id)}>
                      Reject
                    </button>
                  </>
                )}
                {request.currentStatus === 1 && (
                  <p>Approval status: Ride Accepted</p>
                )}
                {request.currentStatus === 2 && (
                  <p>Approval status: Ride Rejected</p>
                )}
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default MyPublishedRideCard;
