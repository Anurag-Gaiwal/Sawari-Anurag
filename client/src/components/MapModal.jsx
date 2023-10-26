import React from "react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import the Leaflet CSS
import styles from "./MapModal.module.css";

function MapModal({ ride, onClose }) {
  // Access the startCoordinates property within the ride object
  const startCoordinates = ride.startCoordinates;
  const endCoordinates = ride.endCoordinates;
  console.log("ride details inside modal", ride);
  console.log("Start coordinates in modal", startCoordinates);
  const switchedStartCoordinates = [startCoordinates[1], startCoordinates[0]];
  const switchedEndCoordinates = [endCoordinates[1], endCoordinates[0]];

  // Define initial center and zoom level
  //   const initialCenter = switchedCoordinates || [0, 0]; // Use [0, 0] if coordinates are not available
  const initialZoom = 13; // Adjust the initial zoom level as needed

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <MapContainer
          center={switchedStartCoordinates}
          zoom={initialZoom}
          scrollWheelZoom={true}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={switchedStartCoordinates}>
            <Popup>
              Start location. <br />
              {ride.exactStartLocation}
            </Popup>
          </Marker>
          <Marker position={switchedEndCoordinates}>
            <Popup>
              End location <br /> {ride.exactEndLocation}.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapModal;
