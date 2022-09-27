import { OwnedNft } from "alchemy-sdk";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { GetUser } from "../../utils/api";
import { formatWalletAddress } from "../../utils/formatWalletAddress";
import styles from "./styles/MapMarker.module.scss";
import more from "./assets/more.svg";
import markerIcon from "./assets/map-marker.svg";
import { motion } from "framer-motion";
import { useMapRef } from "../../hooks/Editor.hooks";
import { CoordinateT } from "../../hooks/EditorProvider";
import { PrevViewT } from "../../App";
export type Coordinate = {
  lng: number;
  lat: number;
};
const MapMarker = ({
  coordinate,
  setActive,
  active,
  title = "MARKER",
  wallet,
  setPrevView,
}: {
  coordinate: Coordinate;
  setActive: Dispatch<SetStateAction<boolean>>;
  active: boolean;
  title?: string;
  wallet: string;
  setPrevView: Dispatch<SetStateAction<PrevViewT | null>>;
}) => {
  const [currentActive, setCurrentActive] = useState(false);
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const mapRef = useMapRef();
  useEffect(() => {
    if (!active && currentActive) {
      setCurrentActive(false);
    }
  }, [active]);
  const OpenMarkerHandler = async (e: mapboxgl.MapboxEvent<MouseEvent>) => {
    if (mapRef.current) {
      setPrevView({
        center: mapRef.current.getCenter(),
        zoom: mapRef.current.getZoom(),
      });
      mapRef.current.flyTo({
        center: coordinate,
        zoom: 7,
        speed: 1.5,
      });
    }
    if (!active) {
      e.originalEvent.stopPropagation();
      setActive(true);
      setCurrentActive(true);
    }
    const { nfts } = await GetUser(wallet);
    setNfts(nfts);
    console.log(nfts);
  };
  const openNftHandler = async (nft: OwnedNft) => {
    window.open(`https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`);
  };
  const viewAllHandler = async (nft: OwnedNft) => {
    window.open(`https://opensea.io/${wallet}/desperate-ape-wives`);
  };
  console.log(active, currentActive, wallet);
  return (
    <>
      <Marker onClick={OpenMarkerHandler} latitude={coordinate.lat} longitude={coordinate.lng}>
        <motion.div
          className={styles.MapMarker}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => console.log("activated")}
        >
          <img src={markerIcon} />
        </motion.div>
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
          <div className={styles.popup_Content}>
            <div className={styles.popup_Content_nfts}>
              {[...nfts, ...nfts, ...nfts].slice(0, 9).map((nft) => (
                <motion.div
                  key={nft.title}
                  onClick={() => openNftHandler(nft)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.nft}
                >
                  <img src={nft.media[0].gateway} alt={nft.title} />
                  <p>{nft.title}</p>
                </motion.div>
              ))}
              {[...nfts, ...nfts, ...nfts].length > 9 && (
                <motion.div
                  onClick={() => viewAllHandler(nfts[0])}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={styles.nft_more}
                >
                  <img src={more} alt={"More"} />
                  <p>View all</p>
                </motion.div>
              )}
            </div>
            <div className={styles.popup_Content_user}>
              <p>{formatWalletAddress(wallet)}</p>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default MapMarker;
