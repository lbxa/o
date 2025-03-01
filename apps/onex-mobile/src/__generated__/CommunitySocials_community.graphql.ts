/**
 * @generated SignedSource<<bde89d5e46aa46926f1f21dd12da35b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunitySocials_community$data = {
  readonly firstMember: {
    readonly avatarUrl: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly id: string;
  readonly memberCount: number | null | undefined;
  readonly secondMember: {
    readonly avatarUrl: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly " $fragmentType": "CommunitySocials_community";
};
export type CommunitySocials_community$key = {
  readonly " $data"?: CommunitySocials_community$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunitySocials_community">;
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
    "name": "firstName",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "avatarUrl",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CommunitySocials_community",
  "selections": [
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
      "name": "firstMember",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "secondMember",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Community",
  "abstractKey": null
};
})();

(node as any).hash = "96055ae22ad184e3457e743ae5cc304f";

export default node;
