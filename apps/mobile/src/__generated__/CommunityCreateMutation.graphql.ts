/**
 * @generated SignedSource<<74f45d25a7b4a4a30d97b8f44fafb3c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CommunityCreateInput = {
  isPublic: boolean;
  name: string;
};
export type CommunityCreateMutation$variables = {
  communityCreateInput: CommunityCreateInput;
};
export type CommunityCreateMutation$data = {
  readonly communityCreate: {
    readonly isPublic: boolean | null | undefined;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPublic",
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
          (v2/*: any*/),
          (v3/*: any*/)
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
          (v3/*: any*/),
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
    "cacheID": "5e3400a7fec75bfac3bee6377f1b2729",
    "id": null,
    "metadata": {},
    "name": "CommunityCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CommunityCreateMutation(\n  $communityCreateInput: CommunityCreateInput!\n) {\n  communityCreate(communityCreateInput: $communityCreateInput) {\n    name\n    isPublic\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "383c143e43a98b1b181f1feee8fedeb1";

export default node;
