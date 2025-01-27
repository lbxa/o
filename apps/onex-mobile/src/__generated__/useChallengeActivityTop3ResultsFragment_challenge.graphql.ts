/**
 * @generated SignedSource<<d1d757d1a04ed425cccf10b19181a5b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type useChallengeActivityTop3ResultsFragment_challenge$data = {
  readonly activityTopResults: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"TopResultCard_challenge">;
      };
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "useChallengeActivityTop3ResultsFragment_challenge";
};
export type useChallengeActivityTop3ResultsFragment_challenge$key = {
  readonly " $data"?: useChallengeActivityTop3ResultsFragment_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"useChallengeActivityTop3ResultsFragment_challenge">;
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
          "activityTopResults"
        ]
      }
    ]
  },
  "name": "useChallengeActivityTop3ResultsFragment_challenge",
  "selections": [
    {
      "alias": "activityTopResults",
      "args": null,
      "concreteType": "ChallengeActivityResultConnection",
      "kind": "LinkedField",
      "name": "__ChallengeActivityTop3ResultsFragment_activityTopResults_connection",
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
                  "name": "TopResultCard_challenge"
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

(node as any).hash = "b581e2882863f6c1a6f640e3d9545885";

export default node;
