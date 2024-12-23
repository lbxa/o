/**
 * @generated SignedSource<<d0cfa9e8644ecc2eeb14b67f418c0376>>
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
export type userBioMutation$variables = {
  input: UserUpdateInput;
};
export type userBioMutation$data = {
  readonly userUpdate: {
    readonly bio: string | null | undefined;
    readonly id: string;
  };
};
export type userBioMutation = {
  response: userBioMutation$data;
  variables: userBioMutation$variables;
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
        "name": "bio",
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
    "name": "userBioMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userBioMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4068e46f52dfec2e474e45c798322096",
    "id": null,
    "metadata": {},
    "name": "userBioMutation",
    "operationKind": "mutation",
    "text": "mutation userBioMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    bio\n  }\n}\n"
  }
};
})();

(node as any).hash = "f82e2b4ee6191eb43d1c52d1b8933524";

export default node;
