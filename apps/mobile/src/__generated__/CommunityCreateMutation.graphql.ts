/**
 * @generated SignedSource<<d87ffac7f5dc6dd0949cb5a17a3f3e87>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CommunityCreateInput = {
  name: string;
};
export type CommunityCreateMutation$variables = {
  communityCreateInput: CommunityCreateInput;
};
export type CommunityCreateMutation$data = {
  readonly communityCreate: {
    readonly name: string;
  };
};
export type CommunityCreateMutation = {
  response: CommunityCreateMutation$data;
  variables: CommunityCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "communityCreateInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "communityCreateInput",
    "variableName": "communityCreateInput"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "communityCreate",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommunityCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Community",
        "kind": "LinkedField",
        "name": "communityCreate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "97fe9b7ebb5a9b4859c457435e32024a",
    "id": null,
    "metadata": {},
    "name": "CommunityCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CommunityCreateMutation(\n  $communityCreateInput: CommunityCreateInput!\n) {\n  communityCreate(communityCreateInput: $communityCreateInput) {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f267ebd08e0e5e5bcf3be5dc6669a4fb";

export default node;
