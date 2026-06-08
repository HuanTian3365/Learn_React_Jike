/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken, removeToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      _setToken(action.payload);
      console.log(action.payload);
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

function fetchLogin(loginForm: any) {
  return async (dispatch: any) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
}

function fetchUserInfo() {
  return async (dispatch: any) => {
    const res = await request.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
}

export { fetchLogin, setToken, fetchUserInfo, clearUserInfo };

const userReducer = userStore.reducer;
export default userReducer;
