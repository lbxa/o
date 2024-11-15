import type { User } from "@o/api-gql";
import type { PreloadedQuery } from "react-relay";
import type { StateCreator } from "zustand";

import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";

// import type { ViewerQuery } from "@/__generated__/ViewerQuery.graphql";
import type { ChallengeSlice } from "./challenge.slice";
import type { CommunitySlice } from "./community.slice";

export interface UserSlice {
  preloadedProfileQuery: PreloadedQuery<UserProfileQuery> | null;
  setPreloadedProfileQuery: (query: PreloadedQuery<UserProfileQuery>) => void;
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
  preloadedProfileQuery: null,
  setPreloadedProfileQuery: (query: PreloadedQuery<UserProfileQuery>) =>
    set({ preloadedProfileQuery: query }),
  activeUser: null,
  setActiveUser: (user: User) => set({ activeUser: user }),
  removeActiveUser: () => set({ activeUser: null }),
  logoutUser: () => set({ activeUser: null }),
});
