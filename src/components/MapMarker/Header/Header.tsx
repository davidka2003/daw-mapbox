import React from "react";
import ConnectWalletButton from "../../../hooks/ConnectWalletButton";
import { useAddress } from "../../../hooks/useAddress";
import { formatWalletAddress } from "../../../utils/formatWalletAddress";
import styles from "./styles/Header.module.scss";
const Header = () => {
  const walletAddress = useAddress();
  return (
    <header className={styles.HeaderWrapper}>
      <div className={styles.Header}>
        <div className={styles.Header_connect}>
          {walletAddress && <p>{formatWalletAddress(walletAddress)}</p>}
          <ConnectWalletButton className={styles.Header_connect_btn} />
        </div>
      </div>
    </header>
  );
};

export default Header;
