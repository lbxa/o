/**
 * @generated SignedSource<<eb73f689d5a622fcd77d6f7c89f4748d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
import type { FragmentRefs } from "relay-runtime";
export type UserProfile_updatable_userFriendship$data = {
  readonly id: string;
  status: InvitationStatus;
  readonly " $fragmentType": "UserProfile_updatable_userFriendship";
};
export type UserProfile_updatable_userFriendship$key = {
  readonly " $data"?: UserProfile_updatable_userFriendship$data;
  readonly $updatableFragmentSpreads: FragmentRefs<"UserProfile_updatable_userFriendship">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfile_updatable_userFriendship",
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
  "type": "UserFriendship",
  "abstractKey": null
};

(node as any).hash = "72b33f52cdc47135d22a10af804e54b1";

export default node;
