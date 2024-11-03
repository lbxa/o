import type { User } from "@o/api";
import type { StateCreator } from "zustand";

import type { ChallengeSlice } from "./challenge.slice";
import type { CommunitySlice } from "./community.slice";

export interface UserSlice {
  activeUser: User | null;
  setActiveUser: (user: User) => void;
  logoutUser: () => void;
}

export const createUserSlice: StateCreator<
  UserSlice & CommunitySlice & ChallengeSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  activeUser: null,
  setActiveUser: (user: User) => set({ activeUser: user }),
  logoutUser: () => set({ activeUser: null }),
});
