/**
 * @generated SignedSource<<1b2748c03bf9ffde338b194c91f75ec8>>
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
export type communityManageNameMutation$variables = {
  input: CommunityUpdateInput;
};
export type communityManageNameMutation$data = {
  readonly communityUpdate: {
    readonly id: string;
    readonly name: string;
  };
};
export type communityManageNameMutation = {
  response: communityManageNameMutation$data;
  variables: communityManageNameMutation$variables;
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
    "name": "communityManageNameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "communityManageNameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6d53195d793831b5f0f0edc2d77e94ef",
    "id": null,
    "metadata": {},
    "name": "communityManageNameMutation",
    "operationKind": "mutation",
    "text": "mutation communityManageNameMutation(\n  $input: CommunityUpdateInput!\n) {\n  communityUpdate(communityUpdateInput: $input) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "388e72b951823a98513af74e6bc351ac";

export default node;
