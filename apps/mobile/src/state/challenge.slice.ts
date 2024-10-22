import type { Challenge } from "@o/api";
import type { Draft } from "immer";
import { produce } from "immer";
import type { StateCreator } from "zustand";

import type { CommunitySlice } from "./community.slice";
import type { UserSlice } from "./user.slice";

type ChallengeForm = Partial<Challenge>;

export interface ChallengeSlice {
  selectedChallenge: Challenge | null;
  challengeForm: ChallengeForm;
  setSelectedChallenge: (challenge: Challenge) => void;
  setChallengeFormField: <K extends keyof ChallengeForm>(
    field: K,
    value: ChallengeForm[K]
  ) => void;
}

export const createChallengeSlice: StateCreator<
  ChallengeSlice & UserSlice & CommunitySlice,
  [["zustand/immer", never]],
  [],
  ChallengeSlice
> = (set) => ({
  selectedChallenge: null,
  challengeForm: {},
  setSelectedChallenge: (challenge) => set({ selectedChallenge: challenge }),
  setChallengeFormField: (field, value) =>
    set(
      produce((state: Draft<ChallengeSlice>) => {
        state.challengeForm[field] = value;
      })
    ),
});
