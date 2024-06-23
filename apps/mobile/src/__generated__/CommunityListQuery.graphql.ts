/**
 * @generated SignedSource<<915918ebc3349ae6b9304837c0ccdf7f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CommunityListQuery$variables = Record<PropertyKey, never>;
export type CommunityListQuery$data = {
  readonly communities: ReadonlyArray<{
    readonly _id: number;
    readonly name: string;
  }> | null | undefined;
};
export type CommunityListQuery = {
  response: CommunityListQuery$data;
  variables: CommunityListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Community",
    "kind": "LinkedField",
    "name": "communities",
    "plural": true,
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
        "name": "name",
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
    "name": "CommunityListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CommunityListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "175c31150349b3a51f561a12e1f64198",
    "id": null,
    "metadata": {},
    "name": "CommunityListQuery",
    "operationKind": "query",
    "text": "query CommunityListQuery {\n  communities {\n    _id: id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "ca01ddaa021623d1365d78dc53df5b2b";

export default node;
