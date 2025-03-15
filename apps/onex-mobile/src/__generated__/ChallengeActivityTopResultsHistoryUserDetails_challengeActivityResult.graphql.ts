/**
 * @generated SignedSource<<21595d263b901134f3a4ad9e3b938910>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult$data = {
  readonly user: {
    readonly avatarUrl: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly handle: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
    readonly streak: {
      readonly currentStreak: number;
      readonly id: string;
    } | null | undefined;
  };
  readonly " $fragmentType": "ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult";
};
export type ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult$key = {
  readonly " $data"?: ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult">;
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
  "name": "ChallengeActivityTopResultsHistoryUserDetails_challengeActivityResult",
  "selections": [
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserStreak",
          "kind": "LinkedField",
          "name": "streak",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "currentStreak",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ChallengeActivityResult",
  "abstractKey": null
};
})();

(node as any).hash = "edd55ab09f1a1ac79ceb6dc9d1b27bba";

export default node;
