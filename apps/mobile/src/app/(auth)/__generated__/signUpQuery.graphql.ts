/**
 * @generated SignedSource<<80fed8e8aec515b6b695e2db87d177bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type signUpQuery$variables = {
  id: number;
};
export type signUpQuery$data = {
  readonly user: {
    readonly _id: number | null | undefined;
    readonly email: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly lastName: string | null | undefined;
  } | null | undefined;
};
export type signUpQuery = {
  response: signUpQuery$data;
  variables: signUpQuery$variables;
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
    "name": "signUpQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "signUpQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "27aebf01800bf6fcf3e534e40b6cca09",
    "id": null,
    "metadata": {},
    "name": "signUpQuery",
    "operationKind": "query",
    "text": "query signUpQuery(\n  $id: Int!\n) {\n  user(id: $id) {\n    _id: id\n    firstName\n    lastName\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "c4df7ff6900765b9edfc93ea9c39ad3d";

export default node;
