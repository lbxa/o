/**
 * @generated SignedSource<<555bd6da0b7542ad23b68bd38b3ab1b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityInvitationCard_communityInvitation$data = {
  readonly community: {
    readonly id: string;
    readonly isVerified: boolean | null | undefined;
    readonly name: string;
  };
  readonly id: string;
  readonly inviter: {
    readonly firstName: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  };
  readonly " $fragmentType": "CommunityInvitationCard_communityInvitation";
};
export type CommunityInvitationCard_communityInvitation$key = {
  readonly " $data"?: CommunityInvitationCard_communityInvitation$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityInvitationCard_communityInvitation">;
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
  "name": "CommunityInvitationCard_communityInvitation",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "inviter",
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
        },
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
  "type": "CommunityInvitation",
  "abstractKey": null
};
})();

(node as any).hash = "8287f9cb9f3181cbc944b471869e8cd3";

export default node;
