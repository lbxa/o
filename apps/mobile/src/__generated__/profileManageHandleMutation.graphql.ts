/**
 * @generated SignedSource<<8c5903a45b5ce8ff4f715355db4eee9c>>
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
export type profileManageHandleMutation$variables = {
  input: UserUpdateInput;
};
export type profileManageHandleMutation$data = {
  readonly userUpdate: {
    readonly handle: string | null | undefined;
    readonly id: string;
  };
};
export type profileManageHandleMutation = {
  response: profileManageHandleMutation$data;
  variables: profileManageHandleMutation$variables;
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
    "name": "profileManageHandleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "profileManageHandleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "843b070e7e34d9e4dbfe151f663a2c19",
    "id": null,
    "metadata": {},
    "name": "profileManageHandleMutation",
    "operationKind": "mutation",
    "text": "mutation profileManageHandleMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    handle\n  }\n}\n"
  }
};
})();

(node as any).hash = "eebf1a90d4ce6123ad22601379dc1306";

export default node;
