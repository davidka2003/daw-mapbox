import { useDimensions } from "@hooks/other/dimensions";
import { useAppDispatch, useAppSelector } from "@hooks/redux/redux";
import { UpdateUserInfo } from "@store/user/user.reducer";
import { formatWalletAddress } from "@utils/other/formatWalletAddress";
import { type OwnedNft } from "alchemy-sdk";
import { motion } from "framer-motion";
import React, { ChangeEvent, useMemo } from "react";
import { Popup } from "react-map-gl";
import styled from "styled-components";
import more from "./assets/more.svg";
const StyledCard = styled(Popup)`
  margin-top: 10px; //50% of marker
  background-color: #0000002f;
  position: relative;
  width: 700px;
  min-height: 100px;
  @media only screen and (max-width: 768px) {
    width: 280px;
  }
`;
const StyledNftsContainer = styled.div`
  min-height: 170px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
`;
const StyledUserInfo = styled.div`
  padding: 20px 0;
  width: 100%;
  @media only screen and (max-width: 768px) {
    padding: 10px 0;
    font-size: 30px;
    line-height: 110%;
  }
`;
const StyledContentContainer = styled.div`
  min-height: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  font-family: "Oswald";
  align-items: flex-start;
  gap: 20px;
`;
const StyledNftCard = styled(motion.div)`
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  display: flex;
  height: fit-content;
  width: 120px;
  img {
    height: 120px;
    width: 120px;
  }
  p {
    padding: 5px;
    font-size: 16px;
    font-family: "Oswald";
  }
`;
const StyledUserNameInput = styled(motion.input)`
  background-color: #0000002f;
  border: none;
  padding: 20px 10px;
  font-size: 40px;
  line-height: 110%;
  color: white;
  outline: none;
  @media only screen and (max-width: 768px) {
    padding: 10px 10px;
    padding: 10px 10px;
    max-width: 50%;
    font-size: 30px;
  }
`;
const StyledUserName = styled(motion.p)`
  padding: 20px 0;
  height: fit-content;
  line-height: 110%;
  @media only screen and (max-width: 768px) {
    padding: 10px 0;
    font-size: 30px;
  }
`;
const StyledMore = styled(motion.div)`
  flex-direction: column;
  justify-content: center;
  display: flex;
  height: fit-content;
  width: 120px;
  cursor: pointer;
  scale: 0.5;
`;
interface CardProps {
  longitude: number;
  latitude: number;
}

const Card = ({ longitude, latitude }: CardProps) => {
  const { isMobile } = useDimensions();
  const { editor, user } = useAppSelector((state) => state);
  const current = useAppSelector((state) => state.users.current);
  const openNftHandler = async (nft: OwnedNft) => {
    window.open(`https://opensea.io/assets/ethereum/${nft.contract.address}/${nft.tokenId}`);
  };
  const dispatch = useAppDispatch();
  const isOwner = useMemo(() => {
    if (!current.value?.user?.id || !user.user.value) {
      return false;
    }
    return current.value.user.id === user.user.value.id;
  }, [current.value?.user?.id]);
  const isEditable = useMemo(() => isOwner && editor.isOpen, [isOwner, editor.isOpen]);
  console.log(current.value, longitude, latitude);
  const MAX_NFTS = useMemo(() => (isMobile ? 4 : 10) - 1, [isMobile]);
  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(!user.user.value, !isEditable);
    if (!user.user.value || !isEditable) {
      return;
    }
    console.log("passed");
    const currentUser = { ...user.user.value, name: e.target.value };
    console.log(currentUser);
    dispatch(UpdateUserInfo({ user: currentUser }));
  };
  const viewAllHandler = async (nft: OwnedNft) => {
    if (!current.value?.user) {
      return;
    }
    window.open(`https://opensea.io/${current.value.user.wallet}/desperate-ape-wives`);
  };
  return (
    <StyledCard
      maxWidth={"none"}
      closeButton={false}
      anchor={isMobile ? "center" : "top"}
      longitude={longitude}
      latitude={latitude}
    >
      <StyledContentContainer>
        <StyledNftsContainer>
          {current.value &&
            current.value.nfts.slice(0, MAX_NFTS).map((nft) => {
              return (
                <StyledNftCard
                  key={nft.title}
                  onClick={() => openNftHandler(nft)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={nft.media[0].gateway} alt={nft.title} />
                  <p>{nft.title}</p>
                </StyledNftCard>
              );
            })}
          {current.value && current.value.nfts.length > MAX_NFTS && (
            <StyledMore
              onClick={() => current.value && viewAllHandler(current.value.nfts[0])}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={more} alt={"More"} />
              <p>View all</p>
            </StyledMore>
          )}
        </StyledNftsContainer>
        <StyledUserInfo>
          {current.value?.user &&
            (isEditable && user.user.value ? (
              <StyledUserNameInput
                maxLength={42}
                minLength={3}
                onChange={nameChangeHandler}
                value={user.user.value.name || ""}
                type="text"
                placeholder={"Username"}
              />
            ) : (
              /** @todo instead of wallet, put username and make username = wallet on backend */
              <StyledUserName>
                {current.value.user.name ?? formatWalletAddress(current.value.user.wallet)}
              </StyledUserName>
            ))}
        </StyledUserInfo>
      </StyledContentContainer>
    </StyledCard>
  );
};

export default Card;
