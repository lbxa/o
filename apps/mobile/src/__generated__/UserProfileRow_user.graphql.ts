/**
 * @generated SignedSource<<9006d48ba802de5aeb331202a0debbec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfileRow_user$data = {
  readonly firstName: string | null | undefined;
  readonly id: string;
  readonly lastName: string | null | undefined;
  readonly streak: {
    readonly currentStreak: number;
    readonly id: string;
  } | null | undefined;
  readonly " $fragmentType": "UserProfileRow_user";
};
export type UserProfileRow_user$key = {
  readonly " $data"?: UserProfileRow_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfileRow_user">;
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
  "name": "UserProfileRow_user",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserStreak",
      "kind": "LinkedField",
      "name": "streak",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "currentStreak",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "b4502eafa28cedb7186a61fd7d996cdd";

export default node;
