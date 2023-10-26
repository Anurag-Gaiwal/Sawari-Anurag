import { useEffect, useState } from "react";
import { MapContainer, Popup, TileLayer, Marker, useMap } from "react-leaflet";
import styles from "./Map.module.css";
// import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
function Map({ geoLocationPosition }) {
  const [mapPosition, setmapPosition] = useState([19.076, 72.8777]);

  setmapPosition(geoLocationPosition);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <ChangeCenter position={mapPosition} zoom={20} />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 20);
  console.log(position);
  return null; //Since it is a component it has to return a jsx
}
export default Map;
