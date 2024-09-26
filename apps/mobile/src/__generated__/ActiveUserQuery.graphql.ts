/**
 * @generated SignedSource<<c0c2979b9e0834ebfdc6743fc2e1de05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ActiveUserQuery$variables = Record<PropertyKey, never>;
export type ActiveUserQuery$data = {
  readonly activeUser: {
    readonly email: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  } | null | undefined;
};
export type ActiveUserQuery = {
  response: ActiveUserQuery$data;
  variables: ActiveUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "activeUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ActiveUserQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ActiveUserQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "df2f10fa96d40aa68d2b8a28ec7ce00d",
    "id": null,
    "metadata": {},
    "name": "ActiveUserQuery",
    "operationKind": "query",
    "text": "query ActiveUserQuery {\n  activeUser {\n    id\n    firstName\n    lastName\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "eb03f85a6bd5b7a7487c2e110be5dc94";

export default node;
