/**
 * @generated SignedSource<<baa338938b8359acc915090fdf2a5dfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type SocialGallery$data = {
  readonly firstThreeMembers?: ReadonlyArray<{
    readonly avatarUrl: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  }> | null | undefined;
  readonly id?: string;
  readonly memberCount?: number | null | undefined;
  readonly " $fragmentType": "SocialGallery";
};
export type SocialGallery$key = {
  readonly " $data"?: SocialGallery$data;
  readonly " $fragmentSpreads": FragmentRefs<"SocialGallery">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "memberCount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "firstThreeMembers",
    "plural": true,
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
        "args": [
          {
            "kind": "Literal",
            "name": "size",
            "value": "LARGE"
          }
        ],
        "kind": "ScalarField",
        "name": "avatarUrl",
        "storageKey": "avatarUrl(size:\"LARGE\")"
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SocialGallery",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": (v1/*: any*/),
      "type": "Community",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v1/*: any*/),
      "type": "Challenge",
      "abstractKey": null
    }
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};
})();

(node as any).hash = "45a004b82e066b07cf9c2c6a5e47795e";

export default node;
