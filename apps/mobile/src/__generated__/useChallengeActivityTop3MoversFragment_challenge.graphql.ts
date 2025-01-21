/**
 * @generated SignedSource<<b9081e7a3d68f89fd8a5b2d8ba6b1955>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type useChallengeActivityTop3MoversFragment_challenge$data = {
  readonly activityTopMovers: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"TopMoverCard_challenge">;
      };
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useChallengeActivityTop3MoversFragment_challenge";
};
export type useChallengeActivityTop3MoversFragment_challenge$key = {
  readonly " $data"?: useChallengeActivityTop3MoversFragment_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"useChallengeActivityTop3MoversFragment_challenge">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "activityTopMovers"
        ]
      }
    ]
  },
  "name": "useChallengeActivityTop3MoversFragment_challenge",
  "selections": [
    {
      "alias": "activityTopMovers",
      "args": null,
      "concreteType": "ChallengeActivityResultConnection",
      "kind": "LinkedField",
      "name": "__ChallengeActivityTop3MoversFragment_activityTopMovers_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ChallengeActivityResultEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "ChallengeActivityResult",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "TopMoverCard_challenge"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};

(node as any).hash = "0655b3d3cb749e05365a615a3cd0b3fa";

export default node;
