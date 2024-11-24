/**
 * @generated SignedSource<<60f695c5fa99409c3be26f25ea31bf48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type CommunityCreateInput = {
  isPublic: boolean;
  name: string;
};
export type CommunityCreateMutation$variables = {
  communityCreateInput: CommunityCreateInput;
};
export type CommunityCreateMutation$data = {
  readonly communityCreate: {
    readonly communityEdge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly isPublic: boolean | null | undefined;
        readonly name: string;
      };
    };
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "communityCreateInput",
        "variableName": "communityCreateInput"
      }
    ],
    "concreteType": "CommunityCreatePayload",
    "kind": "LinkedField",
    "name": "communityCreate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommunityEdge",
        "kind": "LinkedField",
        "name": "communityEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Community",
            "kind": "LinkedField",
            "name": "node",
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
        ],
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
    "name": "CommunityCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommunityCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b8e3212fc4320e693046d42c577c8cf",
    "id": null,
    "metadata": {},
    "name": "CommunityCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CommunityCreateMutation(\n  $communityCreateInput: CommunityCreateInput!\n) {\n  communityCreate(communityCreateInput: $communityCreateInput) {\n    communityEdge {\n      cursor\n      node {\n        id\n        name\n        isPublic\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b16b4459c5ccbdfed91a0dc1ce6bcba1";

export default node;
