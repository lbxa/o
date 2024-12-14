/**
 * @generated SignedSource<<2c1fbf3f2cb4ac549f41db09618dcf75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type useLogoutMutation$variables = Record<PropertyKey, never>;
export type useLogoutMutation$data = {
  readonly authLogout: boolean;
};
export type useLogoutMutation = {
  response: useLogoutMutation$data;
  variables: useLogoutMutation$variables;
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
    "name": "useLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a1877534aaf3a4a4c2b75020062205cc",
    "id": null,
    "metadata": {},
    "name": "useLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation useLogoutMutation {\n  authLogout\n}\n"
  }
};
})();

(node as any).hash = "a7ef5e53fa73017c325b05bcdb278942";

export default node;
