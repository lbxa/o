/**
 * @generated SignedSource<<7f178062d5952aa854491ee7915358ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeActivityHistoryCard_challenge$data = {
  readonly createdAt: Date | null | undefined;
  readonly formattedResult: string;
  readonly id: string;
  readonly targetReached: boolean | null | undefined;
  readonly user: {
    readonly avatarUrl: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly handle: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  };
  readonly " $fragmentType": "ChallengeActivityHistoryCard_challenge";
};
export type ChallengeActivityHistoryCard_challenge$key = {
  readonly " $data"?: ChallengeActivityHistoryCard_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityHistoryCard_challenge">;
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
  "name": "ChallengeActivityHistoryCard_challenge",
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
          "args": null,
          "kind": "ScalarField",
          "name": "handle",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "size",
              "value": "MEDIUM"
            }
          ],
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": "avatarUrl(size:\"MEDIUM\")"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedResult",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "targetReached",
      "storageKey": null
    }
  ],
  "type": "ChallengeActivityResult",
  "abstractKey": null
};
})();

(node as any).hash = "f335a4d4f98b95f3877574c8bc3f0f16";

export default node;
