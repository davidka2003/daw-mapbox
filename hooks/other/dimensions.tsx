import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const useDimensions = () => {
  return useContext(context);
};
const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  isMobile: window.innerWidth <= 768,
};
const context = createContext(initialState);
const DimensionsProvider = ({ children }: { children: ReactNode }) => {
  const [dimensions, setDimensions] = useState(initialState);
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 768,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return <context.Provider value={dimensions}>{children}</context.Provider>;
};
export default DimensionsProvider;
