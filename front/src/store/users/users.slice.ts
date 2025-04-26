import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";
import { login, refreshToken, register } from "./users.async";

interface State {
  user: IUser | null;
  error: Error | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers(builder) {
    builder

      // REGISTER
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload as IUser;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })

      // LOGIN
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload as IUser;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })

      // REFRESH TOKEN
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload as IUser;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as Error;
      })
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      });
  },
});
export const { logout } = usersSlice.actions;
export default usersSlice;
