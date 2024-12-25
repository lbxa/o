/**
 * @generated SignedSource<<ee44961838fafca42d9f5a4dff70c6cf>>
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
export type communityManageVisibilityMutation$variables = {
  input: CommunityUpdateInput;
};
export type communityManageVisibilityMutation$data = {
  readonly communityUpdate: {
    readonly id: string;
    readonly isPublic: boolean | null | undefined;
  };
};
export type communityManageVisibilityMutation = {
  response: communityManageVisibilityMutation$data;
  variables: communityManageVisibilityMutation$variables;
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
        "name": "isPublic",
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
    "name": "communityManageVisibilityMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "communityManageVisibilityMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b057b59f531f492462d3d60c555b6101",
    "id": null,
    "metadata": {},
    "name": "communityManageVisibilityMutation",
    "operationKind": "mutation",
    "text": "mutation communityManageVisibilityMutation(\n  $input: CommunityUpdateInput!\n) {\n  communityUpdate(communityUpdateInput: $input) {\n    id\n    isPublic\n  }\n}\n"
  }
};
})();

(node as any).hash = "718b8ef1885ed021d758db162fbc53b0";

export default node;
