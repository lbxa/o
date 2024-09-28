/**
 * @generated SignedSource<<e2717d2c0170abe339da69f03446e663>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UserCreateValidateEmailQuery$variables = {
  email: string;
};
export type UserCreateValidateEmailQuery$data = {
  readonly userValidateEmail: {
    readonly alreadyTaken: boolean;
  } | null | undefined;
};
export type UserCreateValidateEmailQuery = {
  response: UserCreateValidateEmailQuery$data;
  variables: UserCreateValidateEmailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      }
    ],
    "concreteType": "ValidEmailResponse",
    "kind": "LinkedField",
    "name": "userValidateEmail",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "alreadyTaken",
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
    "name": "UserCreateValidateEmailQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserCreateValidateEmailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fea729f512ec29a51c22bd445991da12",
    "id": null,
    "metadata": {},
    "name": "UserCreateValidateEmailQuery",
    "operationKind": "query",
    "text": "query UserCreateValidateEmailQuery(\n  $email: String!\n) {\n  userValidateEmail(email: $email) {\n    alreadyTaken\n  }\n}\n"
  }
};
})();

(node as any).hash = "3a83390405f69df5d17ec4f5cfe86085";

export default node;
