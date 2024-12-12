import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TUser = {
  _id: "",
  UserName: "",
  RoleID: 0,
  Avatar: "",
  Description: "",
  Email: "",
  LinkedIn: "",
  Created: null,
  CreatedBy: "",
  Updated: null,
  UpdatedBy: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => state,
    updateUser: (state, action: PayloadAction<TUser>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => ({
      ...state,
      ...initialState,
    }),
  },
});

export const { getUser, updateUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
