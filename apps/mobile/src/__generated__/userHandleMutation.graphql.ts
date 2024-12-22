/**
 * @generated SignedSource<<fd1886ca2f1cdec6414fbfca1088ceda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type UserUpdateInput = {
  bio?: string | null | undefined;
  email?: string | null | undefined;
  firstName?: string | null | undefined;
  handle?: string | null | undefined;
  id: string;
  lastName?: string | null | undefined;
};
export type userHandleMutation$variables = {
  input: UserUpdateInput;
};
export type userHandleMutation$data = {
  readonly userUpdate: {
    readonly handle: string | null | undefined;
    readonly id: string;
  };
};
export type userHandleMutation = {
  response: userHandleMutation$data;
  variables: userHandleMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userUpdateInput",
        "variableName": "input"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "userUpdate",
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
        "name": "handle",
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
    "name": "userHandleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userHandleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "26a99a0257a75b8c59b7f7b5a5e41d89",
    "id": null,
    "metadata": {},
    "name": "userHandleMutation",
    "operationKind": "mutation",
    "text": "mutation userHandleMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    handle\n  }\n}\n"
  }
};
})();

(node as any).hash = "92e726070a7e81d48c6c79e1a22672a1";

export default node;
