/**
 * @generated SignedSource<<f714182eef2d4c1fb0bcd934a552f5a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type ChallengeActivityGoal = "HIGHEST_NUMBER" | "LONGEST_TIME" | "LOWEST_NUMBER" | "MOST_IMPROVED" | "SHORTEST_TIME" | "SPECIFIC_TARGET" | "%future added value";
export type ChallengeActivityMeasurement = "COUNTING" | "DURATION" | "IMPROVEMENT" | "%future added value";
export type ChallengeActivityType = "DISTANCE" | "REPETITIONS" | "SOCIAL" | "TIME_BASED" | "WEIGHTLIFTING" | "%future added value";
export type ChallengeActivityUnits = "FEET" | "HOURS" | "KILOGRAMS" | "KILOMETRES" | "METRES" | "MILES" | "MINUTES" | "NONE" | "PERCENT" | "POUNDS" | "SECONDS" | "%future added value";
import type { FragmentRefs } from "relay-runtime";
export type ChallengeFragment$data = {
  readonly activity: {
    readonly goal: ChallengeActivityGoal;
    readonly id: string;
    readonly measurement: ChallengeActivityMeasurement;
    readonly target: number | null | undefined;
    readonly type: ChallengeActivityType;
    readonly unit: ChallengeActivityUnits;
  };
  readonly description: string | null | undefined;
  readonly endDate: Date | null | undefined;
  readonly id: string;
  readonly name: string;
  readonly startDate: Date | null | undefined;
  readonly " $fragmentType": "ChallengeFragment";
};
export type ChallengeFragment$key = {
  readonly " $data"?: ChallengeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeFragment">;
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
  "name": "ChallengeFragment",
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
      "name": "startDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
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
          "name": "measurement",
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
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};
})();

(node as any).hash = "f482b2aa2237e5af26e8bbb0c6028373";

export default node;
