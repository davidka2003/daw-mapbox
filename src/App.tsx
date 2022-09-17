import mapboxgl from "mapbox-gl";
import React, { useEffect, useMemo, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import styles from "./App.module.scss";
import Header from "./components/MapMarker/Header/Header";
import MapMarker from "./components/MapMarker/MapMarker";
const ACCESS_TOKEN = "pk.eyJ1IjoiZDR2MWRzMG4iLCJhIjoiY2w3dXIyMWUxMDRnazN1b3pvMWM5emdrNCJ9.AWDIeSfhav8dUOXMEtuvSg";
function App() {
  const [markers, setMarkers] = useState<{ lng: number; lat: number }[]>([]);
  const [active, setActive] = useState(false);
  const [coordinate, setCoordinate] = useState<{ lng: number; lat: number } | null>(null);
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((r) => {
      const marker = { lat: r.coords.latitude, lng: r.coords.longitude };
      setMarkers((markers) => [...markers, { lng: 45, lat: 45 }, { lng: 35, lat: 60 }, { lng: 30, lat: 41 }]);
      setCoordinate(marker);
    });
  }, []);
  const mapClickHandler = async ({ lngLat }: { lngLat: mapboxgl.LngLat }) => {
    // console.log(lngLat);
    if (!active) {
      setCoordinate({ lat: lngLat.lat, lng: lngLat.lng });
    }
    setActive((state) => false);
  };
  return (
    <div className={styles.App}>
      <Header />
      <Map
        initialViewState={{
          longitude: 40,
          latitude: 40,
          zoom: 3.5,
        }}
        attributionControl={false}
        mapboxAccessToken={ACCESS_TOKEN}
        // style={{ width: "100%", height: "100%" }}
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
        onClick={mapClickHandler}
      >
        {markers.map((marker, index) => (
          <MapMarker coordinate={marker} active={active} setActive={setActive} />
        ))}
        {/** @comment My marker */}
        {coordinate && <MapMarker active={false} setActive={() => {}} coordinate={coordinate} />}
      </Map>
    </div>
  );
}
export default App;
