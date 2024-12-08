/**
 * @generated SignedSource<<5a6efcef980b282ab8690b4b9e23a168>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type ViewerProfileLogoutMutation$variables = Record<PropertyKey, never>;
export type ViewerProfileLogoutMutation$data = {
  readonly authLogout: boolean;
};
export type ViewerProfileLogoutMutation = {
  response: ViewerProfileLogoutMutation$data;
  variables: ViewerProfileLogoutMutation$variables;
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
    "name": "ViewerProfileLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewerProfileLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fbd830f0963ceb60ab9c70c1a69e6e9b",
    "id": null,
    "metadata": {},
    "name": "ViewerProfileLogoutMutation",
    "operationKind": "mutation",
    "text": "mutation ViewerProfileLogoutMutation {\n  authLogout\n}\n"
  }
};
})();

(node as any).hash = "749638f26049570710c073351d2844bf";

export default node;
