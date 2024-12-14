/**
 * @generated SignedSource<<77c754328c8c5fd221378f0229df3bff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
import type { FragmentRefs } from "relay-runtime";
export type UserProfile_userFriendshipStatus$data = {
  readonly areMutualFriends: boolean;
  readonly incoming: {
    readonly id: string;
    readonly status: InvitationStatus;
  } | null | undefined;
  readonly outgoing: {
    readonly id: string;
    readonly status: InvitationStatus;
  } | null | undefined;
  readonly " $fragmentType": "UserProfile_userFriendshipStatus";
};
export type UserProfile_userFriendshipStatus$key = {
  readonly " $data"?: UserProfile_userFriendshipStatus$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfile_userFriendshipStatus">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfile_userFriendshipStatus",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserFriendship",
      "kind": "LinkedField",
      "name": "outgoing",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserFriendship",
      "kind": "LinkedField",
      "name": "incoming",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "areMutualFriends",
      "storageKey": null
    }
  ],
  "type": "UserFriendshipStatus",
  "abstractKey": null
};
})();

(node as any).hash = "254665995da004276a79914153f76326";

export default node;
