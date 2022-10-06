import { MapConfig } from "@utils/configs/map.config";
import React, { MutableRefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import Map, { MapRef } from "react-map-gl";
import { useAppDispatch, useAppSelector } from "@hooks/redux/redux";
import { GetUsers } from "@store/users/users.reducer";
import { MapMarker } from "@components/MapMarker";
import { CloseUserModal } from "@store/map/map.reducer";
import { LocationT } from "types/user";
import { UpdateUserInfo } from "@store/user/user.reducer";
import { useMap } from "@hooks/map/map";
const StyledMembersMap = styled(Map)``;
interface MembersMapProps {}

const MembersMap = ({}: MembersMapProps) => {
  const dispatch = useAppDispatch();
  const { user, authorized } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(GetUsers());
  }, []);
  const { users, current } = useAppSelector((state) => state.users);
  const { locate, initUser, flyOut, flyTo, mapRef } = useMap();
  const MapClickHandler = async ({ lngLat }: { lngLat: mapboxgl.LngLat }) => {
    dispatch(CloseUserModal());
    console.log("map clicked");
    UpdateLocationHandler(lngLat);
  };
  const UpdateLocationHandler = ({ lng, lat }: LocationT) => {
    if (!user.value) return;
    const currentUser = { ...user.value };
    dispatch(
      UpdateUserInfo({
        user: {
          ...currentUser,
          location: { lng, lat },
        },
      })
    );
  };
  useEffect(() => {
    authorized && initUser();
  }, [user.value?.id, authorized]);

  return (
    <StyledMembersMap ref={mapRef} onClick={MapClickHandler} {...MapConfig}>
      {users.value.map((user) => (
        <MapMarker key={user.id} user={user} />
      ))}
      {user.value && user.value.location && (
        <MapMarker
          key={user.value.id}
          //@ts-ignore
          user={user.value}
        />
      )}
    </StyledMembersMap>
  );
};

export default MembersMap;
