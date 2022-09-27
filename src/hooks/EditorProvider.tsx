import React, { createContext, useState, Dispatch, SetStateAction, MutableRefObject, useRef } from "react";
import { MapRef } from "react-map-gl";
type UseStateT<T> = [T, Dispatch<SetStateAction<T>>];
export type CoordinateT = { lng: number; lat: number };
export type EditorT = {
  location: boolean;
};

interface EditorContextI {
  useCoordinateState: UseStateT<CoordinateT | null>;
  useEditorState: UseStateT<EditorT>;
  mapRef: MutableRefObject<MapRef | null>;
}
export const EditorContext = createContext<EditorContextI>({
  //@ts-ignore
  useCoordinateState: undefined,
  //@ts-ignore
  useEditorState: undefined,
  //@ts-ignore
  useMapRefState: undefined,
});

const EditorProvider = ({ children }: { children: JSX.Element }) => {
  const [coordinate, setCoordinate] = useState(null) as EditorContextI["useCoordinateState"];
  const [editor, setEditor] = useState({
    location: false,
  }) as EditorContextI["useEditorState"];
  const mapRef = useRef(null) as EditorContextI["mapRef"];

  return (
    <EditorContext.Provider
      value={{
        mapRef,
        useCoordinateState: [coordinate, setCoordinate],
        useEditorState: [editor, setEditor],
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
