/**
 * @generated SignedSource<<563d689b23bda3543333d3a475d1dc2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type CommunityUpdateInput = {
  id: string;
  isPublic?: boolean | null | undefined;
  name?: string | null | undefined;
};
export type communityNameMutation$variables = {
  input: CommunityUpdateInput;
};
export type communityNameMutation$data = {
  readonly communityUpdate: {
    readonly id: string;
    readonly name: string;
  };
};
export type communityNameMutation = {
  response: communityNameMutation$data;
  variables: communityNameMutation$variables;
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
        "name": "communityUpdateInput",
        "variableName": "input"
      }
    ],
    "concreteType": "Community",
    "kind": "LinkedField",
    "name": "communityUpdate",
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
        "name": "name",
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
    "name": "communityNameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "communityNameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8ae953c829034957f5b01a9eef825fb4",
    "id": null,
    "metadata": {},
    "name": "communityNameMutation",
    "operationKind": "mutation",
    "text": "mutation communityNameMutation(\n  $input: CommunityUpdateInput!\n) {\n  communityUpdate(communityUpdateInput: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "72664312886151d3952b44e5963275a7";

export default node;
