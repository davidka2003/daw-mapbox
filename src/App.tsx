import { Header } from "@components/Header";
import { MembersMap } from "@components/MembersMap";
import { useDimensions } from "@hooks/other/dimensions";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
const StyledAppLayout = styled.div``;
function App() {
  const { isMobile } = useDimensions();
  return (
    <StyledAppLayout>
      <Header />
      <MembersMap />
      <ToastContainer position={isMobile ? "bottom-center" : "top-left"} />
    </StyledAppLayout>
  );
}
export default App;
