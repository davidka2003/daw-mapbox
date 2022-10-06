import mapboxgl from "mapbox-gl";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { PreviewT } from "types/map";
import Map, { Marker, Popup } from "react-map-gl";
import { UserWithLocationI } from "types/user";
import { OpenUserModal } from "@store/map/map.reducer";
import { useAppDispatch, useAppSelector } from "@hooks/redux/redux";
import { motion } from "framer-motion";
import more from "./assets/more.svg";
import markerIcon from "./assets/map-marker.svg";
import { Card } from "@components/Card";
import { useMap } from "@hooks/map/map";
const StyledMapMarker = styled(Marker)``;
const StyledMarkerIcon = styled(motion.div)`
  img {
    height: 30px;
    transform: translateY(-50%);
  }
`;
interface MarkerProps {
  user: UserWithLocationI;
  // setPreview: Dispatch<SetStateAction<PreviewT | null>>;
}

const MapMarker = ({ user }: MarkerProps) => {
  const dispacth = useAppDispatch();
  const mapState = useAppSelector((state) => state.map);
  const usersState = useAppSelector((state) => state.users);
  const [currentActive, setCurrentActive] = useState(false);
  const { flyTo, flyOut } = useMap();
  const { editor, user: AuthorizedUser } = useAppSelector((state) => state);
  const OpenMarkerHandler = (e: mapboxgl.MapboxEvent<MouseEvent>) => {
    if (!mapState.isModalActive) {
      e.originalEvent.stopPropagation();
      flyTo(user.location);
      setCurrentActive(true);
      dispacth(OpenUserModal({ wallet: user.wallet }));
    }
  };
  useEffect(() => {
    if (!mapState.isModalActive && currentActive) {
      flyOut();
      setCurrentActive(false);
    }
  }, [mapState.isModalActive]);
  useEffect(() => {
    //open modal once editor opened
    console.log(editor.isOpen && user.id === AuthorizedUser.user.value?.id && AuthorizedUser.authorized);
    if (editor.isOpen && user.id === AuthorizedUser.user.value?.id && AuthorizedUser.authorized) {
      flyTo(user.location);
      setCurrentActive(true);
      dispacth(OpenUserModal({ wallet: user.wallet }));
    }
  }, [editor.isOpen, AuthorizedUser.user.value?.id, AuthorizedUser.authorized]);
  return (
    <>
      <StyledMapMarker onClick={OpenMarkerHandler} latitude={user.location.lat} longitude={user.location.lng}>
        <StyledMarkerIcon whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <img src={markerIcon} alt="" />
        </StyledMarkerIcon>
      </StyledMapMarker>
      {mapState.isModalActive && currentActive && <Card latitude={user.location.lat} longitude={user.location.lng} />}
    </>
  );
};

export default MapMarker;
