/**
 * @generated SignedSource<<22c7261a65f79a60c935a713f3e89f49>>
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
export type UserRecordCard_userRecord$data = {
  readonly activityResult: {
    readonly formattedResult: string;
    readonly id: string;
  };
  readonly challenge: {
    readonly activity: {
      readonly goal: ChallengeActivityGoal;
      readonly id: string;
      readonly target: number | null | undefined;
      readonly type: ChallengeActivityType;
      readonly unit: ChallengeActivityUnits;
    };
    readonly community: {
      readonly id: string;
      readonly isVerified: boolean | null | undefined;
      readonly name: string;
    } | null | undefined;
    readonly id: string;
    readonly name: string;
  };
  readonly user: {
    readonly firstName: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  };
  readonly " $fragmentType": "UserRecordCard_userRecord";
};
export type UserRecordCard_userRecord$key = {
  readonly " $data"?: UserRecordCard_userRecord$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserRecordCard_userRecord">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserRecordCard_userRecord",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        }
      ],
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
        (v1/*: any*/),
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
              "name": "unit",
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
              "name": "type",
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
          "alias": null,
          "args": null,
          "concreteType": "Community",
          "kind": "LinkedField",
          "name": "community",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isVerified",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ChallengeActivityResult",
      "kind": "LinkedField",
      "name": "activityResult",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formattedResult",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UserRecord",
  "abstractKey": null
};
})();

(node as any).hash = "8d52591ea9059fccffd9f26eea1a6b74";

export default node;
