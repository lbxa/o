/**
 * @generated SignedSource<<9f65bc0947035ad7cca881e3852bfcc2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type UserProfileLogoutMutation$variables = Record<PropertyKey, never>;
export type UserProfileLogoutMutation$data = {
  readonly authLogout: boolean;
};
export type UserProfileLogoutMutation = {
  response: UserProfileLogoutMutation$data;
  variables: UserProfileLogoutMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "authLogout",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserProfileLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0dfed32e33f66e3f09a9f7a09b1942a3",
    "id": null,
    "metadata": {},
    "name": "UserProfileLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfileLogoutMutation {\n  authLogout\n}\n"
  }
};
})();

(node as any).hash = "2bb42d806e21223607691dc33daf8f70";

export default node;
