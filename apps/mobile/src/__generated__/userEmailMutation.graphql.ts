/**
 * @generated SignedSource<<35e9d218e88fd7c489403759af9850e3>>
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
export type userEmailMutation$variables = {
  input: UserUpdateInput;
};
export type userEmailMutation$data = {
  readonly userUpdate: {
    readonly email: string | null | undefined;
    readonly id: string;
  };
};
export type userEmailMutation = {
  response: userEmailMutation$data;
  variables: userEmailMutation$variables;
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
    "name": "userEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "userEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "42897b55c5192e303a46a4f8f397996a",
    "id": null,
    "metadata": {},
    "name": "userEmailMutation",
    "operationKind": "mutation",
    "text": "mutation userEmailMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "ee9ea58a4395dd984a88ead02dfe7ee7";

export default node;
