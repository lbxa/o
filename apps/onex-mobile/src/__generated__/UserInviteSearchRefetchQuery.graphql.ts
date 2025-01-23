/**
 * @generated SignedSource<<29d6cc86a205d4c2d99ab650a01db0fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserInviteSearchRefetchQuery$variables = {
  searchTerm?: string | null | undefined;
};
export type UserInviteSearchRefetchQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"UserInviteSearchFriends_viewer">;
  } | null | undefined;
};
export type UserInviteSearchRefetchQuery = {
  response: UserInviteSearchRefetchQuery$data;
  variables: UserInviteSearchRefetchQuery$variables;
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
    "name": "UserInviteSearchRefetchQuery",
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
    "name": "UserInviteSearchRefetchQuery",
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
    "cacheID": "55bd7269ee81c1a283146199c3e196b4",
    "id": null,
    "metadata": {},
    "name": "UserInviteSearchRefetchQuery",
    "operationKind": "query",
    "text": "query UserInviteSearchRefetchQuery(\n  $searchTerm: String = null\n) {\n  viewer {\n    ...UserInviteSearchFriends_viewer_1CW4ID\n    id\n  }\n}\n\nfragment UserInviteCard_user on User {\n  id\n  firstName\n  lastName\n  handle\n}\n\nfragment UserInviteSearchFriends_viewer_1CW4ID on Viewer {\n  user {\n    searchFriends(searchTerm: $searchTerm) {\n      ...UserInviteCard_user\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c818bcd828e0d5d3d1e8d2db8a87e7b4";

export default node;
