import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { showNotification } from "./notificationReducer";
import blogServide from "../services/blogs";

export const checkLoggedInUser = createAsyncThunk(
  "login/checkLoggedInUser",
  async (_, { dispatch }) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogServide.setToken(user.token);
      return user;
    } else {
      return null;
    }
  }
);

export const login = createAsyncThunk(
  "login/log",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      return user;
    } catch (error) {
      dispatch(showNotification("Wrong username or password"));
      return rejectWithValue("Wrong username or password");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      window.localStorage.removeItem("loggedUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLoggedInUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
