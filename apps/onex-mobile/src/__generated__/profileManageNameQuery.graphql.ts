/**
 * @generated SignedSource<<3cf13924f7413ba1088eea4e925b5a88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type profileManageNameQuery$variables = Record<PropertyKey, never>;
export type profileManageNameQuery$data = {
  readonly viewer: {
    readonly user: {
      readonly firstName: string;
      readonly id: string;
      readonly lastName: string;
    } | null | undefined;
  } | null | undefined;
};
export type profileManageNameQuery = {
  response: profileManageNameQuery$data;
  variables: profileManageNameQuery$variables;
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
    "name": "profileManageNameQuery",
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
    "name": "profileManageNameQuery",
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
    "cacheID": "c00ac32fea908a5f54535e6edbe21584",
    "id": null,
    "metadata": {},
    "name": "profileManageNameQuery",
    "operationKind": "query",
    "text": "query profileManageNameQuery {\n  viewer {\n    user {\n      id\n      firstName\n      lastName\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "12c67d1ec1cdb56520e820ce4c34007c";

export default node;
