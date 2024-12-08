/**
 * @generated SignedSource<<2cefc607b2bb803f40e9ed8f71d7ae95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserInviteSearchFriendsListQuery$variables = {
  searchTerm?: string | null | undefined;
};
export type UserInviteSearchFriendsListQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UserInviteSearchFriends_viewer">;
  } | null | undefined;
};
export type UserInviteSearchFriendsListQuery = {
  response: UserInviteSearchFriendsListQuery$data;
  variables: UserInviteSearchFriendsListQuery$variables;
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
    "name": "UserInviteSearchFriendsListQuery",
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
            "name": "UserInviteSearchFriends_viewer"
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
    "name": "UserInviteSearchFriendsListQuery",
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
    "cacheID": "3481e270b4132ec8467339141b16682f",
    "id": null,
    "metadata": {},
    "name": "UserInviteSearchFriendsListQuery",
    "operationKind": "query",
    "text": "query UserInviteSearchFriendsListQuery(\n  $searchTerm: String\n) {\n  viewer {\n    ...UserInviteSearchFriends_viewer_1CW4ID\n    id\n  }\n}\n\nfragment UserInviteCard_user on User {\n  id\n  firstName\n  lastName\n  handle\n}\n\nfragment UserInviteSearchFriends_viewer_1CW4ID on Viewer {\n  user {\n    searchFriends(searchTerm: $searchTerm) {\n      ...UserInviteCard_user\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "50448e8971aa97b805af7248a9d7fae2";

export default node;
