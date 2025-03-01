/**
 * @generated SignedSource<<0c879d57eb289ce40798fedaf5edefdd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeSocials_challenge$data = {
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
  readonly " $fragmentType": "ChallengeSocials_challenge";
};
export type ChallengeSocials_challenge$key = {
  readonly " $data"?: ChallengeSocials_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeSocials_challenge">;
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
  "name": "ChallengeSocials_challenge",
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
  "type": "Challenge",
  "abstractKey": null
};
})();

(node as any).hash = "9771d03dbc7bb0bd46bfdc9b67013518";

export default node;
