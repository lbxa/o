/**
 * @generated SignedSource<<05b56b5cecc75861e12ffae5f437df51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type userNameQuery$variables = Record<PropertyKey, never>;
export type userNameQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly firstName: string;
      readonly id: string;
      readonly lastName: string;
    } | null | undefined;
  } | null | undefined;
};
export type userNameQuery = {
  response: userNameQuery$data;
  variables: userNameQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "userNameQuery",
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
              (v0/*: any*/),
              {
                "kind": "RequiredField",
                "field": (v1/*: any*/),
                "action": "THROW"
              },
              {
                "kind": "RequiredField",
                "field": (v2/*: any*/),
                "action": "THROW"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "userNameQuery",
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "540aa80e61b861fd19f27866595cec1b",
    "id": null,
    "metadata": {},
    "name": "userNameQuery",
    "operationKind": "query",
    "text": "query userNameQuery {\n  viewer {\n    user {\n      id\n      firstName\n      lastName\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "33cba6de4ffa4ad9b872b20c84a77d49";

export default node;
