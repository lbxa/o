/**
 * @generated SignedSource<<596b381052fd14495661b8f915e49d0d>>
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
export type profileManageEmailMutation$variables = {
  input: UserUpdateInput;
};
export type profileManageEmailMutation$data = {
  readonly userUpdate: {
    readonly email: string | null | undefined;
    readonly id: string;
  };
};
export type profileManageEmailMutation = {
  response: profileManageEmailMutation$data;
  variables: profileManageEmailMutation$variables;
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
    "name": "profileManageEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "profileManageEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6b05a1acd7caaa8f1a90fe685bbc5b30",
    "id": null,
    "metadata": {},
    "name": "profileManageEmailMutation",
    "operationKind": "mutation",
    "text": "mutation profileManageEmailMutation(\n  $input: UserUpdateInput!\n) {\n  userUpdate(userUpdateInput: $input) {\n    id\n    email\n  }\n}\n"
  }
};
})();

(node as any).hash = "400d7793b907f41fe9cead2149110c3a";

export default node;
