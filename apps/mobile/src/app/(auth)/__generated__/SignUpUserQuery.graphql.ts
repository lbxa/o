/**
 * @generated SignedSource<<cfb045267c9c327918301a9f61c61e0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SignUpUserQuery$variables = {
  id: number;
};
export type SignUpUserQuery$data = {
  readonly user: {
    readonly _id: number | null | undefined;
    readonly email: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly lastName: string | null | undefined;
  } | null | undefined;
};
export type SignUpUserQuery = {
  response: SignUpUserQuery$data;
  variables: SignUpUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": "_id",
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
    "name": "SignUpUserQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignUpUserQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "da1c778b6588e6df9fa28e12563761ea",
    "id": null,
    "metadata": {},
    "name": "SignUpUserQuery",
    "operationKind": "query",
    "text": "query SignUpUserQuery(\n  $id: Int!\n) {\n  user(id: $id) {\n    _id: id\n    firstName\n    lastName\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "92e41a0eb55fc7fa148b8a4521cf8780";

export default node;
