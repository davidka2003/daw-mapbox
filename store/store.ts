import { configureStore } from "@reduxjs/toolkit";
import { editorSlice } from "./editor/editor.reducer";
import { mapSlice } from "./map/map.reducer";
import { userSlice } from "./user/user.reducer";
import { usersSlice } from "./users/users.reducer";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    map: mapSlice.reducer,
    user: userSlice.reducer,
    editor: editorSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
