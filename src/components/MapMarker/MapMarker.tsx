import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import styles from "./styles/MapMarker.module.scss";
export type Coordinate = {
  lng: number;
  lat: number;
};
const MapMarker = ({
  coordinate,
  setActive,
  active,
}: {
  coordinate: Coordinate;
  setActive: Dispatch<SetStateAction<boolean>>;
  active: boolean;
}) => {
  const [currentActive, setCurrentActive] = useState(false);
  useEffect(() => {
    if (!active && currentActive) {
      setCurrentActive(false);
    }
  }, [active]);

  return (
    <>
      <Marker
        onClick={(e) => {
          if (!active) {
            e.originalEvent.stopPropagation();
            setActive(true);
            setCurrentActive(true);
          }
        }}
        latitude={coordinate.lat}
        longitude={coordinate.lng}
      >
        <div className={styles.MapMarker} onClick={() => console.log("activated")}>
          <p>MARKER</p>
        </div>
      </Marker>
      {active && currentActive && (
        <Popup
          maxWidth={"none"}
          closeButton={false}
          className={styles.popup}
          // focusAfterOpen={true}
          anchor={"top"}
          // closeButton={false}
          latitude={coordinate.lat}
          longitude={coordinate.lng}
          // closeOnClick={true}
        >
          <div className={styles.popupContent}>
            <p>Marker</p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MapMarker;
