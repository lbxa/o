/**
 * @generated SignedSource<<b3171a6089051297dd339c28d398e17e>>
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
export type profileManageNameMutation$variables = {
  input: UserUpdateInput;
};
export type profileManageNameMutation$data = {
  readonly userUpdate: {
    readonly firstName: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
  };
};
export type profileManageNameMutation = {
  response: profileManageNameMutation$data;
  variables: profileManageNameMutation$variables;
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
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lastName",
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
    "name": "profileManageNameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "profileManageNameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9575b0db48f90ed6f368b0d414c68b61",
    "id": null,
    "metadata": {},
    "name": "profileManageNameMutation",
    "operationKind": "mutation",
    "text": "mutation profileManageNameMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    firstName\n    lastName\n  }\n}\n"
  }
};
})();

(node as any).hash = "09e00d6d9af4edfab54549a795faaab1";

export default node;
