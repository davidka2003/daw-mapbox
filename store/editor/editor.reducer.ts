import { GetUser, GetUserI } from "@api/user/get-user";
import { GetAllUsers } from "@api/user/get-users";
import { updateUser } from "@api/user/update-user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { Logout, UpdateUserInfo } from "@store/user/user.reducer";
import { GetUserByWallet, GetUsers, ResetCurrent, UpdateCurrent } from "@store/users/users.reducer";
import { LocationT, UserI, UserWithLocationI } from "types/user";

interface InitialStateI {
  //   current: UserI | null;
  previous: UserI | null;
  isOpen: boolean;
}
const initialState: InitialStateI = {
  //   current: null,
  previous: null,
  isOpen: false,
};

export const OpenEditor = createAsyncThunk("editor/openEditor", (_, thunkApi) => {
  const { user } = thunkApi.getState() as RootState;
  if (!user.user.value) {
    throw "Login first";
  }
  return user.user.value;
});

export const SaveUserInfo = createAsyncThunk("editor/updateuserinfo", async (_, thunkApi) => {
  // api update user info
  const {
    editor,
    user: { user },
  } = thunkApi.getState() as RootState;
  if (!editor.isOpen) {
    //editor not open
    return user.value;
  }
  if (!user.value || !editor.previous) {
    return null;
  }
  const response = await updateUser(user.value);
  if (response) {
    //api success
    thunkApi.dispatch(UpdateCurrent({ user: response }));
    return thunkApi.dispatch(UpdateUserInfo({ user: response }));
  } else {
    //if api failed
    thunkApi.dispatch(Logout());
    return await thunkApi.dispatch(UpdateUserInfo({ user: editor.previous }));
  }
});
export const CloseEditorWithoutSave = createAsyncThunk("editor/close_withot_save", (_, thunkApi) => {
  const { editor } = thunkApi.getState() as RootState;
  if (editor.isOpen && editor.previous) {
    thunkApi.dispatch(UpdateUserInfo({ user: editor.previous }));
  }
});
export const editorSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(OpenEditor.fulfilled, (state, action) => {
      const currentState = action.payload;
      state.previous = currentState;
      state.isOpen = true;
    });
    builder.addCase(SaveUserInfo.fulfilled, (state, action) => {
      state.isOpen = false;
      state.previous = null;
    });
    builder.addCase(CloseEditorWithoutSave.fulfilled, (state, action) => {
      state.isOpen = false;
      state.previous = null;
    });
  },
});
