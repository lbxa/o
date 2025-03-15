/**
 * @generated SignedSource<<87a1087227face4452313a87ad0bfda2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeListPaginationQuery$variables = {
  communityId: string;
  count?: number | null | undefined;
  cursor?: string | null | undefined;
};
export type ChallengeListPaginationQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeList_viewer">;
  } | null | undefined;
};
export type ChallengeListPaginationQuery = {
  response: ChallengeListPaginationQuery$data;
  variables: ChallengeListPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v1 = {
  "kind": "Variable",
  "name": "communityId",
  "variableName": "communityId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "firstThreeMembers",
    "plural": true,
    "selections": [
      (v3/*: any*/),
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
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/),
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ],
            "kind": "FragmentSpread",
            "name": "ChallengeList_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChallengeListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "ChallengeConnection",
            "kind": "LinkedField",
            "name": "challenges",
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
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endDate",
                        "storageKey": null
                      },
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
                        "concreteType": "ChallengeActivity",
                        "kind": "LinkedField",
                        "name": "activity",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "type",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "goal",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "unit",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "target",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "kind": "InlineFragment",
                            "selections": (v4/*: any*/),
                            "type": "Community",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v4/*: any*/),
                            "type": "Challenge",
                            "abstractKey": null
                          }
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
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
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "communityId"
            ],
            "handle": "connection",
            "key": "ChallengeList_viewer_challenges",
            "kind": "LinkedHandle",
            "name": "challenges"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "34ada6ace8aeea3b3ab0729fdb480334",
    "id": null,
    "metadata": {},
    "name": "ChallengeListPaginationQuery",
    "operationKind": "query",
    "text": "query ChallengeListPaginationQuery(\n  $communityId: ID!\n  $count: Int = 10\n  $cursor: String\n) {\n  viewer {\n    ...ChallengeList_viewer_441M1w\n    id\n  }\n}\n\nfragment ChallengeActivityPills_challenge on Challenge {\n  id\n  activity {\n    id\n    type\n    goal\n    target\n    unit\n  }\n}\n\nfragment ChallengeCard_challenge on Challenge {\n  id\n  name\n  description\n  startDate\n  endDate\n  memberCount\n  activity {\n    id\n    type\n    goal\n    unit\n    target\n  }\n  ...ChallengeActivityPills_challenge\n  ...SocialGallery\n}\n\nfragment ChallengeList_viewer_441M1w on Viewer {\n  challenges(communityId: $communityId, first: $count, after: $cursor) {\n    edges {\n      cursor\n      node {\n        ...ChallengeCard_challenge\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SocialGallery on Node {\n  __isNode: __typename\n  ... on Community {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl(size: LARGE)\n    }\n  }\n  ... on Challenge {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl(size: LARGE)\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4cf5a5f93bfbaa898acbf5086fdf417b";

export default node;
