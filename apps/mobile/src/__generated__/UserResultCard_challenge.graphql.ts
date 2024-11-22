/**
 * @generated SignedSource<<6ff382e09fb73ddda932f138201c29c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type ChallengeActivityMeasurement = "COUNTING" | "DURATION" | "IMPROVEMENT" | "%future added value";
import type { FragmentRefs } from "relay-runtime";
export type UserResultCard_challenge$data = {
  readonly activity: {
    readonly id: string;
    readonly measurement: ChallengeActivityMeasurement;
  };
  readonly id: string;
  readonly result: number;
  readonly user: {
    readonly firstName: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  };
  readonly " $fragmentType": "UserResultCard_challenge";
};
export type UserResultCard_challenge$key = {
  readonly " $data"?: UserResultCard_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserResultCard_challenge">;
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
  "name": "UserResultCard_challenge",
  "selections": [
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "result",
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
          "name": "measurement",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ChallengeActivityResult",
  "abstractKey": null
};
})();

(node as any).hash = "f0c721f7bc244906d3f7936828574a26";

export default node;
