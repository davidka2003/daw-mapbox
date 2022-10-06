import { useMap } from "@hooks/map/map";
import { useDimensions } from "@hooks/other/dimensions";
import { useAppDispatch, useAppSelector } from "@hooks/redux/redux";
import { CloseEditorWithoutSave, OpenEditor, SaveUserInfo } from "@store/editor/editor.reducer";
import { DeleteUser, UpdateUserInfo } from "@store/user/user.reducer";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
// const StyledEditor = styled(React.Fragment)``;
const StyledEdittorButton = styled(motion.p)`
  cursor: pointer;
  font-size: 20px;
  color: white;
  line-height: 110%;
`;
interface EditorProps {}

const Editor = ({}: EditorProps) => {
  const { editor, user } = useAppSelector((state) => state);
  const { isMobile } = useDimensions();
  const dispatch = useAppDispatch();
  const { locate } = useMap();
  const OpenEditorHandler = () => {
    dispatch(OpenEditor());
  };
  const CloseAndSaveEditorHandler = () => {
    dispatch(SaveUserInfo());
  };
  const Reset = () => {
    dispatch(CloseEditorWithoutSave());
  };
  const DeleteHandler = async () => {
    console.log("Delete me");
    const result = confirm("Are u sure");
    if (result) {
      dispatch(DeleteUser());
    }
  };
  const FindMe = async () => {
    if (!user.user.value) {
      return;
    }
    dispatch(
      UpdateUserInfo({
        user: { ...user.user.value, location: await locate() },
      })
    );
  };
  if (user.authorized) {
    return (
      <>
        {!editor.isOpen && (
          <StyledEdittorButton onClick={OpenEditorHandler} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            EDIT
          </StyledEdittorButton>
        )}
        {editor.isOpen && (
          <>
            <StyledEdittorButton onClick={Reset} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {isMobile ? "CLOSE" : "CLOSE WITHOUT SAVING"}
            </StyledEdittorButton>
            <StyledEdittorButton onClick={FindMe} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              FIND ME
            </StyledEdittorButton>
            <StyledEdittorButton
              onClick={CloseAndSaveEditorHandler}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobile ? "SAVE" : "SAVE & CLOSE"}
            </StyledEdittorButton>
            <StyledEdittorButton onClick={DeleteHandler} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              DELETE ME
            </StyledEdittorButton>
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default Editor;
