import mapboxgl from "mapbox-gl";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Map, { MapRef, Marker, Popup } from "react-map-gl";
import styles from "./App.module.scss";
import Header from "./components/MapMarker/Header/Header";
import MapMarker from "./components/MapMarker/MapMarker";
import { useEditor, useLocation, useMapRef } from "./hooks/Editor.hooks";
import { CoordinateT } from "./hooks/EditorProvider";
import { isConnected } from "./hooks/isConnected";
import { useUser } from "./hooks/useUser";
import { GetAllUsers, updateLocation, UserI } from "./utils/api";
export type PrevViewT = {
  center: CoordinateT;
  zoom: number;
};

const ACCESS_TOKEN = "pk.eyJ1IjoiZDR2MWRzMG4iLCJhIjoiY2w3dXIyMWUxMDRnazN1b3pvMWM5emdrNCJ9.AWDIeSfhav8dUOXMEtuvSg";
function App() {
  const mapRef = useMapRef();
  const { connected, authorized } = isConnected();
  const { user } = useUser();
  const [markers, setMarkers] = useState<UserI[]>([]);
  const [active, setActive] = useState(false);
  const { editor } = useEditor();
  const { initUser, coordinate, updateCoordinate, savePosition } = useLocation();
  const [previousView, setPreviousView] = useState<PrevViewT | null>(null);
  useEffect(() => {
    initMap();
  }, [user?.id]);
  useEffect(() => {
    mapRef.current?.flyTo({
      center: user?.location,
      zoom: 10,
    });
  }, [user?.location]);
  const memoizedMarkers = useMemo(() => markers, [markers]);
  const initMap = async () => {
    const users = await GetAllUsers();
    if (user) {
      console.log(user.wallet);
      await initUser();
      setMarkers(users.filter((marker) => marker.id !== user.id));
    } else {
      setMarkers(users);
    }
  };
  const mapClickHandler = async ({ lngLat }: { lngLat: mapboxgl.LngLat }) => {
    if (!active) {
      if (!authorized) {
        return;
      }
      if (!editor.location) {
        return;
      }
      updateCoordinate({ lat: lngLat.lat, lng: lngLat.lng });
      updateCoordinate(lngLat);
    } else {
      if (mapRef.current && previousView) {
        mapRef.current.flyTo(previousView);
        setPreviousView(null);
      }
      setActive((state) => false);
    }
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
        ref={mapRef}
        attributionControl={false}
        mapboxAccessToken={ACCESS_TOKEN}
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
        onClick={mapClickHandler}
      >
        {memoizedMarkers.map((marker, index) => (
          <MapMarker
            setPrevView={setPreviousView}
            key={marker.id}
            wallet={marker.wallet}
            coordinate={marker.location}
            active={active}
            setActive={setActive}
          />
        ))}
        {/** @comment My marker */}
        {coordinate && user && (
          <MapMarker
            key={user.id}
            wallet={user.wallet}
            setPrevView={setPreviousView}
            // active={false}
            // setActive={() => {}}
            coordinate={coordinate}
            active={active}
            setActive={setActive}
          />
        )}
      </Map>
    </div>
  );
}
export default App;
