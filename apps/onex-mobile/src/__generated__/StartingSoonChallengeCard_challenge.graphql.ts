/**
 * @generated SignedSource<<177f5e8902c15f98bd8dba92d4c8bc68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type ChallengeActivityGoal = "HIGHEST_NUMBER" | "LONGEST_DISTANCE" | "LONGEST_TIME" | "LOWEST_NUMBER" | "MOST_IMPROVED" | "SHORTEST_DISTANCE" | "SHORTEST_TIME" | "SPECIFIC_TARGET" | "%future added value";
export type ChallengeActivityType = "DISTANCE" | "REPETITIONS" | "SOCIAL" | "TIME_BASED" | "WEIGHTLIFTING" | "%future added value";
export type ChallengeActivityUnits = "FEET" | "HOURS" | "KILOGRAMS" | "KILOMETRES" | "METRES" | "MILES" | "MINUTES" | "NONE" | "PERCENT" | "POUNDS" | "SECONDS" | "%future added value";
import type { FragmentRefs } from "relay-runtime";
export type StartingSoonChallengeCard_challenge$data = {
  readonly challenge: {
    readonly activity: {
      readonly goal: ChallengeActivityGoal;
      readonly id: string;
      readonly target: number | null | undefined;
      readonly type: ChallengeActivityType;
      readonly unit: ChallengeActivityUnits;
    };
    readonly id: string;
    readonly memberCount: number | null | undefined;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityPills_challenge" | "ChallengeSocials_challenge">;
  };
  readonly daysUntilStart: number;
  readonly id: string;
  readonly " $fragmentType": "StartingSoonChallengeCard_challenge";
};
export type StartingSoonChallengeCard_challenge$key = {
  readonly " $data"?: StartingSoonChallengeCard_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"StartingSoonChallengeCard_challenge">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StartingSoonChallengeCard_challenge",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "daysUntilStart",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Challenge",
      "kind": "LinkedField",
      "name": "challenge",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "memberCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ChallengeActivity",
          "kind": "LinkedField",
          "name": "activity",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "goal",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "unit",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "target",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChallengeActivityPills_challenge"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChallengeSocials_challenge"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StartingSoonChallenge",
  "abstractKey": null
};
})();

(node as any).hash = "5f00769cfdaf71004584a8c67e58b03d";

export default node;
