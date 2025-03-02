/**
 * @generated SignedSource<<2ac84b77f619f79882a935dcee67d38d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserSearchFriendsListQuery$variables = {
  searchTerm?: string | null | undefined;
};
export type UserSearchFriendsListQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UserSearchFriends_viewer">;
  } | null | undefined;
};
export type UserSearchFriendsListQuery = {
  response: UserSearchFriendsListQuery$data;
  variables: UserSearchFriendsListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchTerm"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "searchTerm",
    "variableName": "searchTerm"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSearchFriendsListQuery",
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
            "args": (v1/*: any*/),
            "kind": "FragmentSpread",
            "name": "UserSearchFriends_viewer"
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
    "name": "UserSearchFriendsListQuery",
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
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "searchFriends",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
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
                    "args": null,
                    "kind": "ScalarField",
                    "name": "avatarUrl",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c3104af77631c204696e8e28694c68f4",
    "id": null,
    "metadata": {},
    "name": "UserSearchFriendsListQuery",
    "operationKind": "query",
    "text": "query UserSearchFriendsListQuery(\n  $searchTerm: String\n) {\n  viewer {\n    ...UserSearchFriends_viewer_1CW4ID\n    id\n  }\n}\n\nfragment UserProfileCard_user on User {\n  id\n  firstName\n  lastName\n  handle\n  avatarUrl\n}\n\nfragment UserSearchFriends_viewer_1CW4ID on Viewer {\n  user {\n    searchFriends(searchTerm: $searchTerm) {\n      ...UserProfileCard_user\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2aec67d29d0baf27c2d97eed3dd71ef8";

export default node;
