import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/userInterface";

export interface UserState {
  users: User[];
  userToken: string;
  feeds: User[];
  userDetail: object;
}

const initialState: UserState = {
  users: [],
  userToken: "",
  feeds: [],
  userDetail: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    addUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addfeeds: (state, action: PayloadAction<User[]>) => {
      state.feeds = action.payload;
    },
    adduserDetail: (state, action: PayloadAction<User[]>) => {
      state.userDetail = action.payload;
    },
    userRemoveData: (state) => {
      state.users = [];
      state.userToken = "";
      state.userDetail = {};
      state.feeds = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, adduserDetail, addUsers, userRemoveData, addfeeds } =
  userSlice.actions;

export default userSlice.reducer;
