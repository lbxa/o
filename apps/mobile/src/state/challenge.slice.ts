import type { Challenge, ChallengeActivity } from "@o/api";
import type { Draft } from "immer";
import { produce } from "immer";
import type { StateCreator } from "zustand";

import type { CommunitySlice } from "./community.slice";
import type { UserSlice } from "./user.slice";

type ChallengeForm = Partial<Challenge>;

type RecordedChallenge = Pick<Challenge, "id" | "name"> &
  Partial<{
    time: number | undefined;
    attempts: number | undefined;
  }>;

export interface ChallengeSlice {
  selectedChallenge: Challenge | null;
  setSelectedChallenge: (challenge: Challenge) => void;
  recordedChallenge: RecordedChallenge | null;
  setRecordedChallenge: (challenge: RecordedChallenge | null) => void;
  setRecordedChallengeField: <K extends keyof RecordedChallenge>(
    field: K,
    value: RecordedChallenge[K]
  ) => void;
  challengeForm: ChallengeForm;
  setChallengeFormField: <K extends keyof ChallengeForm>(
    field: K,
    value: ChallengeForm[K]
  ) => void;
  setChallengeFormActivityField: <K extends keyof ChallengeActivity>(
    field: K,
    value: ChallengeActivity[K]
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
  recordedChallenge: null,
  setRecordedChallenge: (challenge) => set({ recordedChallenge: challenge }),
  setRecordedChallengeField: (field, value) =>
    set(
      produce((state: Draft<ChallengeSlice>) => {
        if (!state.recordedChallenge) return;
        state.recordedChallenge[field] = value;
      })
    ),
  setChallengeFormField: (field, value) =>
    set(
      produce((state: Draft<ChallengeSlice>) => {
        state.challengeForm[field] = value;
      })
    ),
  setChallengeFormActivityField: (field, value) =>
    set(
      produce((state: Draft<ChallengeSlice>) => {
        if (!state.challengeForm.activity) {
          state.challengeForm.activity ??= { id: "-1" }; // TODO how do I get rid of this?
        }
        state.challengeForm.activity[field] = value;
      })
    ),
});
