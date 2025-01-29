/**
 * @generated SignedSource<<cbec349dfb70301df5e2a20f65d594a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type HomeFeedQuery$variables = Record<PropertyKey, never>;
export type HomeFeedQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeFeed_viewer" | "useCommunityInvitationsPagination_viewer">;
  } | null | undefined;
};
export type HomeFeedQuery = {
  response: HomeFeedQuery$data;
  variables: HomeFeedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v1 = {
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastName",
    "storageKey": null
  }
],
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
  "concreteType": "Community",
  "kind": "LinkedField",
  "name": "community",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isVerified",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goal",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unit",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "target",
  "storageKey": null
},
v14 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Challenge",
  "kind": "LinkedField",
  "name": "challenge",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v6/*: any*/),
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
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "firstMember",
      "plural": false,
      "selections": (v14/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "secondMember",
      "plural": false,
      "selections": (v14/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeFeedQuery",
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
              {
                "kind": "Literal",
                "name": "count",
                "value": 5
              }
            ],
            "kind": "FragmentSpread",
            "name": "useCommunityInvitationsPagination_viewer"
          },
          {
            "args": [
              {
                "kind": "Literal",
                "name": "count",
                "value": 10
              }
            ],
            "kind": "FragmentSpread",
            "name": "HomeFeed_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeFeedQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "CommunityInvitationConnection",
            "kind": "LinkedField",
            "name": "communityInvitations",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CommunityInvitationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommunityInvitation",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "inviter",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "communityInvitations(first:5)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "CommunityInvitationList_communityInvitations",
            "kind": "LinkedHandle",
            "name": "communityInvitations"
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v9/*: any*/),
            "concreteType": "HomeFeedConnection",
            "kind": "LinkedField",
            "name": "homeFeed",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "HomeFeedEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isHomeFeedItem"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "daysUntilStart",
                            "storageKey": null
                          },
                          (v15/*: any*/)
                        ],
                        "type": "StartingSoonChallenge",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "daysUntilEnd",
                            "storageKey": null
                          },
                          (v15/*: any*/)
                        ],
                        "type": "EndingSoonChallenge",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": (v5/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Challenge",
                            "kind": "LinkedField",
                            "name": "challenge",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ChallengeActivity",
                                "kind": "LinkedField",
                                "name": "activity",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v12/*: any*/),
                                  (v11/*: any*/),
                                  (v10/*: any*/),
                                  (v13/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ChallengeActivityResult",
                            "kind": "LinkedField",
                            "name": "activityResult",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "formattedResult",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "UserRecord",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "homeFeed(first:10)"
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "HomeFeed_viewer_homeFeed",
            "kind": "LinkedHandle",
            "name": "homeFeed"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "13dc611a021d82380d8f7a7dc7ecaf53",
    "id": null,
    "metadata": {},
    "name": "HomeFeedQuery",
    "operationKind": "query",
    "text": "query HomeFeedQuery {\n  viewer {\n    ...useCommunityInvitationsPagination_viewer_VbLdN\n    ...HomeFeed_viewer_1KmBw7\n    id\n  }\n}\n\nfragment ChallengeActivityPills_challenge on Challenge {\n  id\n  activity {\n    id\n    type\n    goal\n    target\n    unit\n  }\n}\n\nfragment ChallengeSocials_challenge on Challenge {\n  id\n  memberCount\n  firstMember {\n    id\n    firstName\n  }\n  secondMember {\n    id\n    firstName\n  }\n}\n\nfragment CommunityInvitationCard_communityInvitation on CommunityInvitation {\n  id\n  inviter {\n    id\n    firstName\n    lastName\n  }\n  community {\n    id\n    name\n    isVerified\n  }\n}\n\nfragment EndingSoonChallengeCard_challenge on EndingSoonChallenge {\n  id\n  daysUntilEnd\n  challenge {\n    id\n    name\n    memberCount\n    activity {\n      id\n      type\n      goal\n      unit\n      target\n    }\n    ...ChallengeActivityPills_challenge\n    ...ChallengeSocials_challenge\n  }\n}\n\nfragment HomeFeedItem_item on HomeFeedItem {\n  __isHomeFeedItem: __typename\n  ... on StartingSoonChallenge {\n    __typename\n    ...StartingSoonChallengeCard_challenge\n  }\n  ... on EndingSoonChallenge {\n    __typename\n    ...EndingSoonChallengeCard_challenge\n  }\n  ... on UserRecord {\n    __typename\n    ...UserRecordCard_userRecord\n  }\n}\n\nfragment HomeFeed_viewer_1KmBw7 on Viewer {\n  id\n  homeFeed(first: 10) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        __typename\n        ...HomeFeedItem_item\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment StartingSoonChallengeCard_challenge on StartingSoonChallenge {\n  id\n  daysUntilStart\n  challenge {\n    id\n    name\n    memberCount\n    activity {\n      id\n      type\n      goal\n      unit\n      target\n    }\n    ...ChallengeActivityPills_challenge\n    ...ChallengeSocials_challenge\n  }\n}\n\nfragment UserRecordCard_userRecord on UserRecord {\n  user {\n    id\n    firstName\n    lastName\n  }\n  challenge {\n    id\n    name\n    activity {\n      id\n      unit\n      goal\n      type\n      target\n    }\n    community {\n      id\n      name\n      isVerified\n    }\n  }\n  activityResult {\n    id\n    formattedResult\n  }\n}\n\nfragment useCommunityInvitationsPagination_viewer_VbLdN on Viewer {\n  communityInvitations(first: 5) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommunityInvitationCard_communityInvitation\n        id\n        __typename\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "970f210591300060e9f4fe95c20e6dfb";

export default node;
