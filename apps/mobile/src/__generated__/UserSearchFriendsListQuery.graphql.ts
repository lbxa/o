/**
 * @generated SignedSource<<e23ca3b982f84f2f7b39cb19ba61deef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserSearchFriendsListQuery$variables = {
  searchTerm?: string | null | undefined;
};
export type UserSearchFriendsListQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UserSearchFriendsFragment">;
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
            "name": "UserSearchFriendsFragment"
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
                    "name": "email",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "handle",
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
    "cacheID": "242d36427447671158bcfe6854054d5e",
    "id": null,
    "metadata": {},
    "name": "UserSearchFriendsListQuery",
    "operationKind": "query",
    "text": "query UserSearchFriendsListQuery(\n  $searchTerm: String\n) {\n  viewer {\n    ...UserSearchFriendsFragment_1CW4ID\n    id\n  }\n}\n\nfragment UserFragment on User {\n  id\n  firstName\n  lastName\n  email\n  handle\n}\n\nfragment UserSearchFriendsFragment_1CW4ID on Viewer {\n  user {\n    searchFriends(searchTerm: $searchTerm) {\n      ...UserFragment\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bd52943e0e5f0cdf90facb729f54f4cd";

export default node;
