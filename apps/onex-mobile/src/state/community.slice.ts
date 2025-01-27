import type { Community } from "@o/api-gql";
import type { PreloadedQuery } from "react-relay";
import type { StateCreator } from "zustand";

import type { CommunityListQuery } from "../__generated__/CommunityListQuery.graphql";
import type { ChallengeSlice } from "./challenge.slice";
import type { UserSlice } from "./user.slice";

export interface CommunitySlice {
  preloadedCommunityListQuery: PreloadedQuery<CommunityListQuery> | null;
  setPreloadedCommunityListQuery: (
    query: PreloadedQuery<CommunityListQuery>
  ) => void;
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
  preloadedCommunityListQuery: null,
  setPreloadedCommunityListQuery: (query) =>
    set({ preloadedCommunityListQuery: query }),
  selectedCommunity: null,
  setSelectedCommunity: (community) => set({ selectedCommunity: community }),
});
