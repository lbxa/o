/**
 * @generated SignedSource<<85db6282023dfa2d8c2549ff19c51643>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityRootQuery$variables = {
  communityId: string;
};
export type CommunityRootQuery$data = {
  readonly viewer: {
    readonly community: {
      readonly " $fragmentSpreads": FragmentRefs<"CommunityDetails_community" | "CommunityInvitationAcceptList_community" | "CommunityTitle_community">;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeList_viewer">;
  } | null | undefined;
};
export type CommunityRootQuery = {
  response: CommunityRootQuery$data;
  variables: CommunityRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "communityId"
  }
],
v1 = {
  "kind": "Variable",
  "name": "communityId",
  "variableName": "communityId"
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "memberCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
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
},
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityRootQuery",
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
                "kind": "Literal",
                "name": "count",
                "value": 10
              }
            ],
            "kind": "FragmentSpread",
            "name": "ChallengeList_viewer"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Community",
            "kind": "LinkedField",
            "name": "community",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CommunityTitle_community"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CommunityDetails_community"
              },
              {
                "args": [
                  {
                    "kind": "Literal",
                    "name": "count",
                    "value": 5
                  }
                ],
                "kind": "FragmentSpread",
                "name": "CommunityInvitationAcceptList_community"
              }
            ],
            "storageKey": null
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
    "name": "CommunityRootQuery",
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
            "args": (v3/*: any*/),
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Challenge",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
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
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ChallengeActivity",
                        "kind": "LinkedField",
                        "name": "activity",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
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
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": [
              "communityId"
            ],
            "handle": "connection",
            "key": "ChallengeList_viewer_challenges",
            "kind": "LinkedHandle",
            "name": "challenges"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "Community",
            "kind": "LinkedField",
            "name": "community",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isVerified",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": (v10/*: any*/),
                "concreteType": "CommunityInvitationConnection",
                "kind": "LinkedField",
                "name": "invitations",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommunityInvitationEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommunityInvitation",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "invitee",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "firstName",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Community",
                            "kind": "LinkedField",
                            "name": "community",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "invitations(first:5)"
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "CommunityInvitationsAcceptList_invitations",
                "kind": "LinkedHandle",
                "name": "invitations"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f6db2edfaf3994884f7673c158f81b31",
    "id": null,
    "metadata": {},
    "name": "CommunityRootQuery",
    "operationKind": "query",
    "text": "query CommunityRootQuery(\n  $communityId: ID!\n) {\n  viewer {\n    ...ChallengeList_viewer_4okw96\n    community(communityId: $communityId) {\n      ...CommunityTitle_community\n      ...CommunityDetails_community\n      ...CommunityInvitationAcceptList_community_VbLdN\n      id\n    }\n    id\n  }\n}\n\nfragment ChallengeActivityPills_challenge on Challenge {\n  id\n  activity {\n    id\n    type\n    goal\n    target\n    unit\n  }\n}\n\nfragment ChallengeCard_challenge on Challenge {\n  id\n  name\n  description\n  startDate\n  endDate\n  memberCount\n  activity {\n    id\n    type\n    goal\n    unit\n    target\n  }\n  ...ChallengeActivityPills_challenge\n}\n\nfragment ChallengeList_viewer_4okw96 on Viewer {\n  challenges(communityId: $communityId, first: 10) {\n    edges {\n      cursor\n      node {\n        ...ChallengeCard_challenge\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment CommunityDetails_community on Community {\n  memberCount\n}\n\nfragment CommunityInvitationAcceptCard_invitations on CommunityInvitation {\n  id\n  invitee {\n    id\n    firstName\n  }\n  community {\n    id\n    name\n  }\n}\n\nfragment CommunityInvitationAcceptList_community_VbLdN on Community {\n  invitations(first: 5) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommunityInvitationAcceptCard_invitations\n        id\n        __typename\n      }\n    }\n  }\n  id\n}\n\nfragment CommunityTitle_community on Community {\n  id\n  name\n  isVerified\n}\n"
  }
};
})();

(node as any).hash = "d0d5be11a42ec615b2b1852bcba340f7";

export default node;
