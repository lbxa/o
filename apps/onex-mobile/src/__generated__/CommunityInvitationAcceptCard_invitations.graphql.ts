/**
 * @generated SignedSource<<0904762563fbbad154ce7e5c1baf94e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityInvitationAcceptCard_invitations$data = {
  readonly community: {
    readonly id: string;
    readonly name: string;
  };
  readonly id: string;
  readonly invitee: {
    readonly firstName: string | null | undefined;
    readonly id: string;
  };
  readonly " $fragmentType": "CommunityInvitationAcceptCard_invitations";
};
export type CommunityInvitationAcceptCard_invitations$key = {
  readonly " $data"?: CommunityInvitationAcceptCard_invitations$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityInvitationAcceptCard_invitations">;
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
  "name": "CommunityInvitationAcceptCard_invitations",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "invitee",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstName",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommunityInvitation",
  "abstractKey": null
};
})();

(node as any).hash = "a19bc4d9e4d625f8586ccc42f5542fca";

export default node;
