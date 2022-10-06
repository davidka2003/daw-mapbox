import { GetUser, GetUserI } from "@api/user/get-user";
import { GetAllUsers } from "@api/user/get-users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetUserByWallet, ResetCurrent } from "@store/users/users.reducer";
import { MapConfig } from "@utils/configs/map.config";
import { LocationT, UserWithLocationI } from "types/user";

interface InitialStateI {
  isModalActive: boolean;
  coordinate: LocationT;
}
const initialState: InitialStateI = {
  isModalActive: false,
  coordinate: { lat: MapConfig.initialViewState.latitude, lng: MapConfig.initialViewState.longitude },
};

export const OpenUserModal = createAsyncThunk<boolean, { wallet: string }>("openModal", ({ wallet }, thunkApi) => {
  thunkApi.dispatch(GetUserByWallet({ wallet }));
  return true;
});
export const CloseUserModal = createAsyncThunk<boolean>("closeModal", (_, thunkApi) => {
  thunkApi.dispatch(ResetCurrent());
  return false;
});
export const mapSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(OpenUserModal.fulfilled, (state, action) => {
      state.isModalActive = action.payload;
    });
    builder.addCase(CloseUserModal.fulfilled, (state, action) => {
      state.isModalActive = action.payload;
    });
  },
});
