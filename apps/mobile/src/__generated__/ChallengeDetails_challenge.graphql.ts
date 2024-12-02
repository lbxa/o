/**
 * @generated SignedSource<<d5b70eb3d1971aa37adb64ed12781a83>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type ChallengeActivityGoal = "HIGHEST_NUMBER" | "LONGEST_TIME" | "LOWEST_NUMBER" | "MOST_IMPROVED" | "SHORTEST_TIME" | "SPECIFIC_TARGET" | "%future added value";
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
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};
})();

(node as any).hash = "209c87559ed917999bd549a329ba4240";

export default node;
