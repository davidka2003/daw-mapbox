import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import ConnectWalletButton from "../../../hooks/ConnectWalletButton";
import { useEditor, useLocation } from "../../../hooks/Editor.hooks";
import { isConnected } from "../../../hooks/isConnected";
import { useAddress } from "../../../hooks/useAddress";
import { formatWalletAddress } from "../../../utils/formatWalletAddress";
import styles from "./styles/Header.module.scss";
const Header = () => {
  const { connected, authorized } = isConnected();
  const walletAddress = useAddress();
  const { openEditor, closeEditor, editor } = useEditor();
  const { resetPosition, savePosition, locate } = useLocation();
  console.log(editor.location);
  return (
    <header className={styles.HeaderWrapper}>
      <div className={styles.Header}>
        {authorized &&
          (!editor.location ? (
            <div>
              <motion.p onClick={() => openEditor("location")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                EDIT LOCATION
              </motion.p>
            </div>
          ) : (
            <>
              <div>
                <motion.p onClick={locate} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  FIND ME
                </motion.p>
              </div>
              <div>
                <motion.p onClick={resetPosition} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  RESET LOCATION
                </motion.p>
              </div>
              <div>
                <motion.p onClick={savePosition} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  SAVE LOCATION
                </motion.p>
              </div>
            </>
          ))}
        <div className={styles.Header_connect}>
          {walletAddress && connected && <p>{formatWalletAddress(walletAddress)}</p>}
          <ConnectWalletButton className={styles.Header_connect_btn} />
        </div>
      </div>
    </header>
  );
};

export default Header;
