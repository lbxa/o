/**
 * @generated SignedSource<<30b032f5f561a52637d0c17f7bca680d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type ChallengeActivityGoal = "HIGHEST_NUMBER" | "LONGEST_DISTANCE" | "LONGEST_TIME" | "LOWEST_NUMBER" | "MOST_IMPROVED" | "SHORTEST_DISTANCE" | "SHORTEST_TIME" | "SPECIFIC_TARGET" | "%future added value";
export type ChallengeActivityType = "DISTANCE" | "REPETITIONS" | "SOCIAL" | "TIME_BASED" | "WEIGHTLIFTING" | "%future added value";
import type { FragmentRefs } from "relay-runtime";
export type ChallengeDetails_challenge$data = {
  readonly activity: {
    readonly goal: ChallengeActivityGoal;
    readonly id: string;
    readonly type: ChallengeActivityType;
  };
  readonly description: string | null | undefined;
  readonly id: string;
  readonly memberCount: number | null | undefined;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeSocials_challenge">;
  readonly " $fragmentType": "ChallengeDetails_challenge";
};
export type ChallengeDetails_challenge$key = {
  readonly " $data"?: ChallengeDetails_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeDetails_challenge">;
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
  "name": "ChallengeDetails_challenge",
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
      "name": "description",
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChallengeSocials_challenge"
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};
})();

(node as any).hash = "c977315d913afbceea1be49819f29fb2";

export default node;
