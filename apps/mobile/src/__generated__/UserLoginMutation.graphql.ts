/**
 * @generated SignedSource<<46e729cad0ef111e9996b45331e6b99a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AuthLoginInput = {
  email: string;
  password: string;
};
export type UserLoginMutation$variables = {
  authLoginInput: AuthLoginInput;
};
export type UserLoginMutation$data = {
  readonly authLogin: {
    readonly accessToken: string;
    readonly refreshToken: string;
  };
};
export type UserLoginMutation = {
  response: UserLoginMutation$data;
  variables: UserLoginMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "authLoginInput"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "authLoginInput",
        "variableName": "authLoginInput"
      }
    ],
    "concreteType": "AuthLoginResponse",
    "kind": "LinkedField",
    "name": "authLogin",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accessToken",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "refreshToken",
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
    "name": "UserLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eef8df8798335a3e0bf349a52648ac33",
    "id": null,
    "metadata": {},
    "name": "UserLoginMutation",
    "operationKind": "mutation",
    "text": "mutation UserLoginMutation(\n  $authLoginInput: AuthLoginInput!\n) {\n  authLogin(authLoginInput: $authLoginInput) {\n    accessToken\n    refreshToken\n  }\n}\n"
  }
};
})();

(node as any).hash = "b6e215a6fb433540153c8a02e07ce43e";

export default node;
