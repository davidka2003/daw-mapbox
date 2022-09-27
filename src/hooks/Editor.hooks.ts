import { updateLocation } from "../utils/api";
import { useUser } from "./useUser";
import { MutableRefObject, useContext } from "react";
import { CoordinateT, EditorContext, EditorT } from "./EditorProvider";
import { MapRef } from "react-map-gl";
const useLocation = () => {
  const { useCoordinateState, useEditorState } = useContext(EditorContext);
  const [coordinate, setCoordinate] = useCoordinateState;
  const { closeEditor } = useEditor();
  const [editor, setEditor] = useEditorState;
  const { user, updateUser } = useUser();
  const mapRef = useMapRef();
  const initUser = async () => {
    if (!user) return;
    if (user.location) {
      setCoordinate(user.location);
    } else {
      await new Promise((resolve) =>
        window.navigator.geolocation.getCurrentPosition((r) => {
          const marker = { lat: r.coords.latitude, lng: r.coords.longitude };
          setCoordinate(marker);
          resolve(marker);
        })
      );
    }

    // setMarkers((markers) => markers.filter((marker) => marker.id !== user.id));
  };
  const locate = async () => {
    if (!editor.location) {
      return;
    }
    await new Promise((resolve) =>
      window.navigator.geolocation.getCurrentPosition((r) => {
        const marker = { lat: r.coords.latitude, lng: r.coords.longitude };
        setCoordinate(marker);
        console.log(mapRef);
        if (mapRef) {
          mapRef.current?.flyTo({
            center: marker,
            zoom: 10,
          });
        }
        resolve(marker);
      })
    );
  };
  const updateCoordinate = (coordinate: CoordinateT | null) => {
    if (!editor.location) {
      return;
    }
    setCoordinate(coordinate);
  };
  const savePosition = async () => {
    if (!editor.location) {
      return;
    }
    if (!coordinate) {
      return;
    }
    const user = await updateLocation(coordinate);
    user && updateUser(user);
    updateCoordinate(user?.location ?? null);
    setEditor((editor) => ({ ...editor, location: false }));
  };
  const resetPosition = async () => {
    if (!editor.location) {
      return;
    }
    if (!user) return;
    if (user.location) {
      setCoordinate(user.location);
    } else {
      setCoordinate(null);
    }
    closeEditor("location");
  };
  return { coordinate, initUser, locate, savePosition, resetPosition, updateCoordinate };
};
const useEditor = () => {
  const { useEditorState } = useContext(EditorContext);
  const [editor, setEditor] = useEditorState;
  const openEditor = (editor: keyof EditorT) => {
    setEditor((prev) => ({ ...prev, [editor]: true }));
  };
  const closeEditor = (editor: keyof EditorT) => {
    setEditor((prev) => ({ ...prev, [editor]: false }));
  };
  return { openEditor, closeEditor, editor };
};
const useMapRef = () => {
  const { mapRef } = useContext(EditorContext);
  return mapRef;
};
export { useLocation, useEditor, useMapRef };
