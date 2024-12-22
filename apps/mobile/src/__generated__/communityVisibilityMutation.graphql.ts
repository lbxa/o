/**
 * @generated SignedSource<<744aa46d47c3f902dc27f9e1b81e1089>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type CommunityUpdateInput = {
  id: string;
  name?: string | null | undefined;
};
export type communityVisibilityMutation$variables = {
  input: CommunityUpdateInput;
};
export type communityVisibilityMutation$data = {
  readonly communityUpdate: {
    readonly id: string;
    readonly isPublic: boolean | null | undefined;
  };
};
export type communityVisibilityMutation = {
  response: communityVisibilityMutation$data;
  variables: communityVisibilityMutation$variables;
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
    "name": "communityVisibilityMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "communityVisibilityMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "71e1168df0f957acea0eebf47e17960b",
    "id": null,
    "metadata": {},
    "name": "communityVisibilityMutation",
    "operationKind": "mutation",
    "text": "mutation communityVisibilityMutation(\n  $input: CommunityUpdateInput!\n) {\n  communityUpdate(communityUpdateInput: $input) {\n    id\n    isPublic\n  }\n}\n"
  }
};
})();

(node as any).hash = "e96f46314af82ebce5c38ab7b159ce17";

export default node;
