import type { User } from "@o/api-gql";
import type { StateCreator } from "zustand";

import type { ChallengeSlice } from "./challenge.slice";
import type { CommunitySlice } from "./community.slice";

export interface UserSlice {
  activeUser: User | null;
  setActiveUser: (user: User) => void;
  removeActiveUser: () => void;
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
  removeActiveUser: () => set({ activeUser: null }),
  logoutUser: () => set({ activeUser: null }),
});
