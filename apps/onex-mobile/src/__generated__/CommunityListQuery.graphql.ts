/**
 * @generated SignedSource<<2ef3781847a002e8f817f8c7deec04f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityListQuery$variables = Record<PropertyKey, never>;
export type CommunityListQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"CommunityList_viewer" | "useCommunityInvitationsPagination_viewer">;
  } | null | undefined;
};
export type CommunityListQuery = {
  response: CommunityListQuery$data;
  variables: CommunityListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v2 = {
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isVerified",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v9 = [
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
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "firstThreeMembers",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "avatarUrl",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v10 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": [
              {
                "kind": "Literal",
                "name": "count",
                "value": 10
              }
            ],
            "kind": "FragmentSpread",
            "name": "CommunityList_viewer"
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
            "name": "useCommunityInvitationsPagination_viewer"
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
    "name": "CommunityListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CommunityConnection",
            "kind": "LinkedField",
            "name": "communities",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CommunityEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Community",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "quality",
                            "value": "HIGH"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "imageUrl",
                        "storageKey": "imageUrl(quality:\"HIGH\")"
                      },
                      (v6/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "kind": "InlineFragment",
                            "selections": (v9/*: any*/),
                            "type": "Community",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v9/*: any*/),
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
              }
            ],
            "storageKey": "communities(first:10)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "CommunityList_viewer_communities",
            "kind": "LinkedHandle",
            "name": "communities"
          },
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": "CommunityInvitationConnection",
            "kind": "LinkedField",
            "name": "communityInvitations",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CommunityInvitationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommunityInvitation",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "inviter",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v7/*: any*/),
                          (v8/*: any*/)
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
                          (v0/*: any*/),
                          (v4/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
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
            "args": (v10/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "CommunityInvitationList_communityInvitations",
            "kind": "LinkedHandle",
            "name": "communityInvitations"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "92b1f18075c120749426b990dcead03d",
    "id": null,
    "metadata": {},
    "name": "CommunityListQuery",
    "operationKind": "query",
    "text": "query CommunityListQuery {\n  viewer {\n    id\n    ...CommunityList_viewer_1KmBw7\n    ...useCommunityInvitationsPagination_viewer_VbLdN\n  }\n}\n\nfragment CommunityCard_community on Community {\n  id\n  name\n  isVerified\n  imageUrl(quality: HIGH)\n  ...SocialGallery\n}\n\nfragment CommunityInvitationCard_communityInvitation on CommunityInvitation {\n  id\n  inviter {\n    id\n    firstName\n    lastName\n  }\n  community {\n    id\n    name\n    isVerified\n  }\n}\n\nfragment CommunityList_viewer_1KmBw7 on Viewer {\n  id\n  communities(first: 10) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommunityCard_community\n        id\n        __typename\n      }\n    }\n  }\n}\n\nfragment SocialGallery on Node {\n  __isNode: __typename\n  ... on Community {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl\n    }\n  }\n  ... on Challenge {\n    id\n    memberCount\n    firstThreeMembers {\n      id\n      firstName\n      lastName\n      avatarUrl\n    }\n  }\n}\n\nfragment useCommunityInvitationsPagination_viewer_VbLdN on Viewer {\n  communityInvitations(first: 5) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n    }\n    edges {\n      cursor\n      node {\n        ...CommunityInvitationCard_communityInvitation\n        id\n        __typename\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e919eec9196ea27fa4afdcd0666d5ef";

export default node;
