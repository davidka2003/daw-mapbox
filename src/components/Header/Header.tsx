import React, { useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useConnectWallet } from "@hooks/WalletProvider/useConnectWallet";
import { isConnected } from "@hooks/WalletProvider/isConnected";
import { useAddress } from "@hooks/WalletProvider/useAddress";
import { formatWalletAddress } from "@utils/other/formatWalletAddress";
import { useAppDispatch, useAppSelector } from "@hooks/redux/redux";
import { login } from "@api/auth/login";
import { Login, Logout } from "@store/user/user.reducer";
import { useSigner } from "@hooks/WalletProvider/useSigner";
import { Editor } from "@components/Editor";
import { isMobile } from "web3modal";
import { useDimensions } from "@hooks/other/dimensions";
const StyledHeader = styled.header`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1;
  height: fit-content;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 20px 40px;
  gap: 30px;
  font-size: 20px;
  color: white;
  text-decoration: none;
  font-weight: 400;
  line-height: 110%;
  text-align: center;
  @media only screen and (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    max-height: 130px;
  }
`;
const StyledWalletConnect = styled(motion.button)`
  cursor: pointer;
  color: black;
  border: none;
  background-color: white;
  padding: 8px 12px;
  border-radius: 18px;
  font-family: "Oswald";
  line-height: 110%;
  font-size: 20px;
  text-align: center;
  min-width: 100px;
  @media only screen and (max-width: 768px) {
    flex: 0 1;
  }
`;
const StyledWalletAddress = styled.p``;
interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const { isMobile } = useDimensions();
  const { connect } = useConnectWallet();
  const { user, authorized } = useAppSelector((state) => state.user);
  const { connected } = isConnected();
  const signer = useSigner();
  const dispatch = useAppDispatch();
  const address = useAddress();
  const ConnectButtonText = useMemo(() => {
    if (!connected) {
      return isMobile ? "Connect" : "Connect wallet";
    }
    if (connected && !authorized) {
      return isMobile ? "Login" : "Login with wallet";
    }
    return isMobile ? "Logout" : "Disconnect wallet";
  }, [connected, authorized]);
  const connectButtonHandler = useMemo(() => {
    if (!connected) {
      return connect;
    }
    if (connected && !authorized && signer) {
      return () => dispatch(Login({ signer }));
    }
    return () => dispatch(Logout());
  }, [connected, authorized]);
  return (
    <StyledHeader>
      <StyledWalletConnect onClick={connectButtonHandler} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        {ConnectButtonText}
      </StyledWalletConnect>
      {address && <StyledWalletAddress>{formatWalletAddress(address)}</StyledWalletAddress>}
      <Editor />
    </StyledHeader>
  );
};

export default Header;