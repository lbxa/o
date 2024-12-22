/**
 * @generated SignedSource<<c4af4f38c117d4f3fdb344f8dceec70d>>
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
export type emailMutation$variables = {
  input: UserUpdateInput;
};
export type emailMutation$data = {
  readonly userUpdate: {
    readonly email: string | null | undefined;
    readonly id: string;
  };
};
export type emailMutation = {
  response: emailMutation$data;
  variables: emailMutation$variables;
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
    "name": "emailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "emailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b218f2188861b308c94fc9c711900dea",
    "id": null,
    "metadata": {},
    "name": "emailMutation",
    "operationKind": "mutation",
    "text": "mutation emailMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "1328ee50ecb418097dd5dc602061c53b";

export default node;
