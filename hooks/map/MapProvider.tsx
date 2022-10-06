import React, { createContext, useState, Dispatch, SetStateAction, MutableRefObject, useRef } from "react";
import { MapRef } from "react-map-gl";
import { LocationT } from "types/user";
type UseStateT<T> = [T, Dispatch<SetStateAction<T>>];

interface MapContextI {
  mapRef: MutableRefObject<MapRef | null>;
}
export const MapContext = createContext<MapContextI>({
  //@ts-ignore
  useMapRefState: undefined,
});

const MapProvider = ({ children }: { children: JSX.Element }) => {
  const mapRef = useRef(null) as MapContextI["mapRef"];

  return (
    <MapContext.Provider
      value={{
        mapRef,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
