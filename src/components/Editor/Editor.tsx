import { useMap } from "@hooks/map/map";
import { useDimensions } from "@hooks/other/dimensions";
import { useAppDispatch, useAppSelector } from "@hooks/redux/redux";
import { CloseEditorWithoutSave, OpenEditor, SaveUserInfo } from "@store/editor/editor.reducer";
import { DeleteUser, UpdateUserInfo } from "@store/user/user.reducer";
import { motion } from "framer-motion";
import findme from "./assets/findme.svg";
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClose, faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// const StyledEditor = styled(React.Fragment)``;
const StyledEdittorButton = styled(motion.p)`
  cursor: pointer;
  font-size: 20px;
  color: white;
  line-height: 110%;
  text-transform: capitalize;
  img {
    height: 22px;
    width: 22px;
    /* fill: white; */
  }
`;
const StyledFindMe = styled(motion.img)`
  height: 22px;
`;
interface EditorProps {}
const Icon = motion(FontAwesomeIcon);
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
        {!editor.isOpen &&
          (isMobile ? (
            <Icon icon={faUser} onClick={OpenEditorHandler} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
          ) : (
            <StyledEdittorButton onClick={OpenEditorHandler} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              profile
            </StyledEdittorButton>
          ))}
        {editor.isOpen && (
          <>
            <StyledEdittorButton onClick={FindMe} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {/* FIND ME */}
              <img src={findme} alt="" />
            </StyledEdittorButton>
            {isMobile ? (
              <Icon onClick={Reset} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} icon={faClose} />
            ) : (
              <StyledEdittorButton onClick={Reset} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                close
              </StyledEdittorButton>
            )}
            {isMobile ? (
              <Icon
                onClick={CloseAndSaveEditorHandler}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                icon={faSave}
              />
            ) : (
              <StyledEdittorButton
                onClick={CloseAndSaveEditorHandler}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                save
              </StyledEdittorButton>
            )}
            {isMobile ? (
              <Icon onClick={DeleteHandler} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} icon={faTrashCan} />
            ) : (
              <StyledEdittorButton onClick={DeleteHandler} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                delete profile
              </StyledEdittorButton>
            )}
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default Editor;
