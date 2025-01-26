/**
 * @generated SignedSource<<3dd51770eff6442b3c9ae7f594dd837a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type TopResultCard_challenge$data = {
  readonly formattedResult: string;
  readonly id: string;
  readonly user: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"UserProfileRow_user">;
  };
  readonly " $fragmentType": "TopResultCard_challenge";
};
export type TopResultCard_challenge$key = {
  readonly " $data"?: TopResultCard_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"TopResultCard_challenge">;
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
  "name": "TopResultCard_challenge",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserProfileRow_user"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedResult",
      "storageKey": null
    }
  ],
  "type": "ChallengeActivityResult",
  "abstractKey": null
};
})();

(node as any).hash = "7ce237ba884952fb2e854d3fd0c437dd";

export default node;
