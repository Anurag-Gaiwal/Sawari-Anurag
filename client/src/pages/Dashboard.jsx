import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  // const [finalData, setFinalData] = useState(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // If a token exists, send a GET request to fetch user data
      fetch("http://localhost:3000/api/v1/users/:id", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            // Set the user data if the request is successful
            console.log(`data pranav`);
            setUserData(data.data);
            // console.log(`This is frontend ${userData}`);
          } else {
            // Handle error (e.g., token expired, not authenticated)
          }
        })
        .catch((error) => {
          // Handle network or other errors
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    // Log userData whenever it changes
    console.log("This is dashboard data");
    console.log(userData);
  }, [userData]);

  return (
    <>
    <div >
      <PageNav />
      {userData ? (
        <div className="Dashboard-info">
          <h2>Welcome, {userData.name}!</h2>
          <p>Email: {userData.email}</p>
          <p>Phone number:{userData.phoneno}</p>
          <p>Address:{userData.address}</p>
          <p>Age:{userData.age}</p>
          <p>Prefered role:{userData.preferedrole}</p>
          {/* Display other user information */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      
    </div>
    <div>
    <img
      src="/carpoolOpenDoor.png"
      alt="Background"
      className={styles.backgroundCar}
    />
    </div>
    </>

  );
}

export default Dashboard;
