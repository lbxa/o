/**
 * @generated SignedSource<<8b77d5aa22b319d9c9db9677bc349b59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type TopMoverCard_challenge$data = {
  readonly id: string;
  readonly result: number;
  readonly user: {
    readonly " $fragmentSpreads": FragmentRefs<"UserProfileRow_user">;
  };
  readonly " $fragmentType": "TopMoverCard_challenge";
};
export type TopMoverCard_challenge$key = {
  readonly " $data"?: TopMoverCard_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"TopMoverCard_challenge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopMoverCard_challenge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserProfileRow_user"
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
    }
  ],
  "type": "ChallengeActivityResult",
  "abstractKey": null
};

(node as any).hash = "c9de4192f9a9f8d58fe85a3666627b13";

export default node;
