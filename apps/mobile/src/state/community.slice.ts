import type { Community } from "@o/api";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "./store";

interface UserState {
  activeCommunity: Community | undefined;
}

const initialState: UserState = {
  activeCommunity: undefined,
};

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setActiveCommunity: (state, action: PayloadAction<Community>) => {
      state.activeCommunity = action.payload;
    },
  },
});

export const { setActiveCommunity } = communitySlice.actions;

export const selectActiveCommunity = (state: RootState) =>
  state.community.activeCommunity;
