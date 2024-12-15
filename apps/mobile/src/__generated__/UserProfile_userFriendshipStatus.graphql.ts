/**
 * @generated SignedSource<<b3806fe814254a80e445328578756730>>
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

const node: ReaderFragment = {
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
          "kind": "ScalarField",
          "name": "status",
          "storageKey": null
        }
      ],
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

(node as any).hash = "1ee4847682d693a6cb68049d7784717d";

export default node;
