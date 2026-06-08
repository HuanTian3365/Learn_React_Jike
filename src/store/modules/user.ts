/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      _setToken(action.payload);
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
