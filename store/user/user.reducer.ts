import { login } from "@api/auth/login";
import { logout } from "@api/auth/logout";
import { deleteUser } from "@api/user/delete-user";
import { GetUser, GetUserI } from "@api/user/get-user";
import { GetAllUsers } from "@api/user/get-users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CloseEditorWithoutSave } from "@store/editor/editor.reducer";
import { RootState } from "@store/store";
import { GetUsers, RemoveUserFromUsers } from "@store/users/users.reducer";
import { ethers } from "ethers";
import { UserI } from "types/user";

interface InitialStateI {
  user: {
    loading: boolean;
    value: UserI | null;
    error: boolean;
  };
  authorized: boolean;
}
const initialState: InitialStateI = {
  user: {
    loading: false,
    value: null,
    error: false,
  },
  authorized: false,
};
export const Login = createAsyncThunk<UserI | null, { signer: ethers.Signer }>(
  "user/login",
  async ({ signer }, thunkApi) => {
    const user = await login(signer);
    if (user) {
      await thunkApi.dispatch(RemoveUserFromUsers({ user }));
    }
    return user;
  }
);
export const Logout = createAsyncThunk<{ success: boolean }>("user/logout", async (_, thunkApi) => {
  const { success } = await logout();
  thunkApi.dispatch(GetUsers());
  thunkApi.dispatch(CloseEditorWithoutSave());
  return { success };
});
export const DeleteUser = createAsyncThunk("editor/delete_user", async (_, thunkApi) => {
  const response = await deleteUser();
  console.log(response, "sasd");
  if (response) {
    console.log(response, "sasd");
    thunkApi.dispatch(GetUsers());
    thunkApi.dispatch(CloseEditorWithoutSave());
  }
  return null;
});
export const UpdateUserInfo = createAsyncThunk<UserI, { user: UserI }>("user/update", async ({ user }, thunkApi) => {
  const { editor, users } = thunkApi.getState() as RootState;
  if (!editor.isOpen) {
    throw "Editor closed";
  }
  //   if (users.current.value) {
  //     throw "Close modal first";
  //   }
  return user;
});
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(Login.fulfilled, (state, action) => {
      state.user.loading = false;
      console.log(action.payload);
      if (action.payload) {
        state.user.value = action.payload;
        state.authorized = true;
        state.user.error = false;
      }
    });
    builder.addCase(Login.pending, (state, action) => {
      state.user.loading = true;
    });
    builder.addCase(Login.rejected, (state, action) => {
      state.user.error = true;
      state.user.value = null;
      state.user.loading = false;
    });
    builder.addCase(Logout.fulfilled, (state, payload) => {
      state.user.value = null;
      state.authorized = false;
    });
    builder.addCase(DeleteUser.fulfilled, (state, payload) => {
      state.user.value = null;
      state.authorized = false;
    });
    builder.addCase(UpdateUserInfo.fulfilled, (state, action) => {
      state.user.value = action.payload;
    });
  },
});
