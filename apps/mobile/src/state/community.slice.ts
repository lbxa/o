import type { Community } from "@ocorp/api";
import type { StateCreator } from "zustand";

import type { ChallengeSlice } from "./challenge.slice";
import type { UserSlice } from "./user.slice";

export interface CommunitySlice {
  selectedCommunity: Community | null;
  setSelectedCommunity: (community: Community) => void;
}

// follows the pattern StateCreator<MyState, Mutators, [], MySlice>
export const createCommunitySlice: StateCreator<
  CommunitySlice & UserSlice & ChallengeSlice,
  [["zustand/immer", never]],
  [],
  CommunitySlice
> = (set) => ({
  selectedCommunity: null,
  setSelectedCommunity: (community) => set({ selectedCommunity: community }),
});
