import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./posts/posts.slice";
import usersSlice from "./users/users.slice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    user: usersSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
