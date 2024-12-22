/**
 * @generated SignedSource<<fc5b7d6e931afa35472e7f57d017e13f>>
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
export type handleMutation$variables = {
  input: UserUpdateInput;
};
export type handleMutation$data = {
  readonly userUpdate: {
    readonly handle: string | null | undefined;
    readonly id: string;
  };
};
export type handleMutation = {
  response: handleMutation$data;
  variables: handleMutation$variables;
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
    "name": "handleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "handleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eb862d2a67548b54bb53113942c77ace",
    "id": null,
    "metadata": {},
    "name": "handleMutation",
    "operationKind": "mutation",
    "text": "mutation handleMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    handle\n  }\n}\n"
  }
};
})();

(node as any).hash = "7f044fd0652fdf4c40d6c9bc982a2b8f";

export default node;
