/**
 * @generated SignedSource<<c328e61762ceed81ca967b8f8064efbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfileRow_user$data = {
  readonly firstMutualFriend: {
    readonly firstName: string | null | undefined;
    readonly handle: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  } | null | undefined;
  readonly firstName: string | null | undefined;
  readonly handle: string | null | undefined;
  readonly id: string;
  readonly lastName: string | null | undefined;
  readonly mutualCount: number | null | undefined;
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "handle",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfileRow_user",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    (v2/*: any*/),
    (v3/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mutualCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "firstMutualFriend",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "8ffed78b2138d73f48ba0f8941c95b87";

export default node;
