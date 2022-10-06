import { MutableRefObject, useContext } from "react";
import { MapRef } from "react-map-gl";
import { MapContext } from "./MapProvider";
import { useAppDispatch, useAppSelector } from "@hooks/redux/redux";
import { LocationT } from "types/user";
const useMap = () => {
  const mapRef = useMapRef();
  const { user, authorized } = useAppSelector((state) => state.user);
  const initUser = async () => {
    if (!user.value || !authorized) return;
    if (user.value.location) {
      flyTo(user.value.location);
    } else {
      await locate();
    }
  };
  const locate = async (): Promise<LocationT> => {
    return await new Promise((resolve) =>
      window.navigator.geolocation.getCurrentPosition((r) => {
        const marker = { lat: r.coords.latitude, lng: r.coords.longitude };
        flyTo(marker);
        resolve(marker);
      })
    );
  };
  const flyTo = (location: LocationT) => {
    mapRef.current?.flyTo({
      center: location,
      zoom: 10,
    });
  };
  const flyOut = (/* location: LocationT */) => {
    mapRef.current?.flyTo({
      zoom: 7,
    });
  };
  return { mapRef, initUser, locate, flyOut, flyTo };
};
const useMapRef = () => {
  const { mapRef } = useContext(MapContext);
  return mapRef;
};
export { useMap };
