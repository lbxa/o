import type { User } from "@o/api";
import type { StateCreator } from "zustand";

import type { ChallengeSlice } from "./challenge.slice";
import type { CommunitySlice } from "./community.slice";

export interface UserSlice {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
}

export const createUserSlice: StateCreator<
  UserSlice & CommunitySlice & ChallengeSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  logoutUser: () => set({ user: null }),
});
