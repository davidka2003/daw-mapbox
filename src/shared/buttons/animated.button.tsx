import { motion } from "framer-motion";
import React from "react";
import styles from "./styles/animated.button.module.scss";
const AnimatedButton = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div className={styles.ButtonWrapper} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      {children}
    </motion.div>
  );
};

export default AnimatedButton;
