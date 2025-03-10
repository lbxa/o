/**
 * @generated SignedSource<<c71b6a24c80ddd6c203c2d935162a309>>
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
              "name": "quality",
              "value": "MED"
            }
          ],
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": "avatarUrl(quality:\"MED\")"
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

(node as any).hash = "21cca306c1dd3b75185ce6c3385610dd";

export default node;
