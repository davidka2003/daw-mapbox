import { GetUser, GetUserI } from "@api/user/get-user";
import { GetAllUsers } from "@api/user/get-users";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { LocationT, UserI, UserWithLocationI } from "types/user";

interface InitialStateI {
  users: {
    value: UserWithLocationI[];
    loading: boolean;
    error: boolean;
  };
  current: {
    value: GetUserI | null;
    loading: boolean;
    error: boolean;
  };
}
const initialState: InitialStateI = {
  users: {
    value: [],
    loading: false,
    error: false,
  },
  current: {
    value: null,
    loading: false,
    error: false,
  },
};

export const GetUsers = createAsyncThunk("users/getall", async () => {
  return await GetAllUsers();
});
export const GetUserByWallet = createAsyncThunk<GetUserI, { wallet: string }>(
  "users/getByWallet",
  async ({ wallet }, thunkApi) => {
    return await GetUser(wallet);
  }
);
export const ResetCurrent = createAsyncThunk("users/resetCurrent", async () => {
  return initialState.current;
});
export const RemoveUserFromUsers = createAsyncThunk<UserWithLocationI[], { user: UserI }>(
  "users/remove_authorized",
  ({ user }, thunkApi) => {
    const { users } = thunkApi.getState() as RootState;
    return users.users.value.filter((us) => us.id !== user.id);
  }
);
export const UpdateCurrent = createAsyncThunk<UserWithLocationI, { user: UserI }>(
  "users/update_current",
  ({ user }, thunkApi) => {
    if (!user.location) {
      throw "User without location";
    }
    const {
      user: {
        user: { value },
      },
    } = thunkApi.getState() as RootState;
    if (value?.id !== user.id) {
      throw "Can't update current for another user";
    }
    return user as UserWithLocationI;
  }
);
export const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(GetUsers.fulfilled, (state, action) => {
      state.users.value = action.payload;
      state.users.loading = false;
      state.users.error = false;
    });
    builder.addCase(GetUsers.pending, (state, action) => {
      state.users.loading = true;
    });
    builder.addCase(GetUsers.rejected, (state, action) => {
      state.users.loading = false;
      state.users.error = true;
    });
    builder.addCase(GetUserByWallet.fulfilled, (state, action) => {
      state.current.value = action.payload;
      state.current.loading = false;
      state.current.error = false;
    });
    builder.addCase(GetUserByWallet.pending, (state, action) => {
      state.current.loading = true;
    });
    builder.addCase(GetUserByWallet.rejected, (state, action) => {
      state.current.loading = false;
      state.current.error = true;
    });
    builder.addCase(ResetCurrent.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(RemoveUserFromUsers.fulfilled, (state, action) => {
      state.users.value = action.payload;
    });
    builder.addCase(UpdateCurrent.fulfilled, (state, action) => {
      if (!state.current.value) {
        return;
      }
      state.current.value.user = action.payload;
    });
  },
});
