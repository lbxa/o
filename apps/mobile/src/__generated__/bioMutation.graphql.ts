/**
 * @generated SignedSource<<dd1d1353e45ad50978b4c06a1bae22e6>>
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
export type bioMutation$variables = {
  input: UserUpdateInput;
};
export type bioMutation$data = {
  readonly userUpdate: {
    readonly bio: string | null | undefined;
    readonly id: string;
  };
};
export type bioMutation = {
  response: bioMutation$data;
  variables: bioMutation$variables;
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
    "name": "bioMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "bioMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "959dbf4c7bbcc5fd80c591d15519a705",
    "id": null,
    "metadata": {},
    "name": "bioMutation",
    "operationKind": "mutation",
    "text": "mutation bioMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    bio\n  }\n}\n"
  }
};
})();

(node as any).hash = "8764276c1029b015ac58719856a90771";

export default node;
