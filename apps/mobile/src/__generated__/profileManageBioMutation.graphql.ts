/**
 * @generated SignedSource<<12a3459b6427460fa6d13780e130e272>>
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
export type profileManageBioMutation$variables = {
  input: UserUpdateInput;
};
export type profileManageBioMutation$data = {
  readonly userUpdate: {
    readonly bio: string | null | undefined;
    readonly id: string;
  };
};
export type profileManageBioMutation = {
  response: profileManageBioMutation$data;
  variables: profileManageBioMutation$variables;
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
    "name": "profileManageBioMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "profileManageBioMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "19e5acb1d04a77164c334b8183ee3fbf",
    "id": null,
    "metadata": {},
    "name": "profileManageBioMutation",
    "operationKind": "mutation",
    "text": "mutation profileManageBioMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    bio\n  }\n}\n"
  }
};
})();

(node as any).hash = "29f0346414f86237640c0b3c718d472c";

export default node;
