import type { User } from "@o/api";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store";

interface UserState {
  activeUser: User | undefined;
}

const initialState: UserState = {
  activeUser: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action: PayloadAction<User>) => {
      state.activeUser = action.payload;
    },
  },
});

export const { setActiveUser } = userSlice.actions;

export const selectActiveUser = (state: RootState) => state.user.activeUser;
