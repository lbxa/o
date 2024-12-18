/**
 * @generated SignedSource<<6fff7ff2d6a89b442cb3d5e63b664d1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeList_viewer$data = {
  readonly challenges: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ChallengeCard_challenge">;
      };
    }> | null | undefined;
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
      readonly startCursor: string | null | undefined;
    };
  };
  readonly " $fragmentType": "ChallengeList_viewer";
};
export type ChallengeList_viewer$key = {
  readonly " $data"?: ChallengeList_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeList_viewer">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "challenges"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "communityId"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": require('./ChallengeListPaginationQuery.graphql')
    }
  },
  "name": "ChallengeList_viewer",
  "selections": [
    {
      "alias": "challenges",
      "args": [
        {
          "kind": "Variable",
          "name": "communityId",
          "variableName": "communityId"
        }
      ],
      "concreteType": "ChallengeConnection",
      "kind": "LinkedField",
      "name": "__ChallengeList_viewer_challenges_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ChallengeEdge",
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
              "concreteType": "Challenge",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ChallengeCard_challenge"
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
              "name": "startCursor",
              "storageKey": null
            },
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
  "type": "Viewer",
  "abstractKey": null
};
})();

(node as any).hash = "4cf5a5f93bfbaa898acbf5086fdf417b";

export default node;
