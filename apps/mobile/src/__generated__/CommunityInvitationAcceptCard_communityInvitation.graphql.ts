/**
 * @generated SignedSource<<0a44a873658f60ef5eb9d64fb34c2fc2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityInvitationAcceptCard_communityInvitation$data = {
  readonly community: {
    readonly id: string;
    readonly name: string;
  };
  readonly id: string;
  readonly invitee: {
    readonly firstName: string | null | undefined;
    readonly id: string;
  };
  readonly inviter: {
    readonly id: string;
  };
  readonly " $fragmentType": "CommunityInvitationAcceptCard_communityInvitation";
};
export type CommunityInvitationAcceptCard_communityInvitation$key = {
  readonly " $data"?: CommunityInvitationAcceptCard_communityInvitation$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityInvitationAcceptCard_communityInvitation">;
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
  "name": "CommunityInvitationAcceptCard_communityInvitation",
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "inviter",
      "plural": false,
      "selections": [
        (v0/*: any*/)
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

(node as any).hash = "9b0d0a9deafab1c1e5136c1b7cc750f3";

export default node;
