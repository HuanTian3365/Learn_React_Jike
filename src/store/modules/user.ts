/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token") || "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
      console.log(action.payload);
    },
  },
});

export const { setToken } = userStore.actions;

function fetchLogin(loginForm: any) {
  return async (dispatch: any) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
}
export { fetchLogin };

const userReducer = userStore.reducer;
export default userReducer;
