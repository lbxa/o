import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { ChallengeSlice } from "./challenge.slice";
import { createChallengeSlice } from "./challenge.slice";
import type { CommunitySlice } from "./community.slice";
import { createCommunitySlice } from "./community.slice";
import type { UserSlice } from "./user.slice";
import { createUserSlice } from "./user.slice";

export const useZustStore = create<
  UserSlice & CommunitySlice & ChallengeSlice
>()(
  immer((...a) => ({
    ...createUserSlice(...a),
    ...createCommunitySlice(...a),
    ...createChallengeSlice(...a),
  }))
);
