/**
 * @generated SignedSource<<3d2e9f648623a9e4be7dfec138230c66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
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
        readonly " $fragmentSpreads": FragmentRefs<"CommunityCard_community">;
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
    "kind": "Variable",
    "name": "communityCreateInput",
    "variableName": "communityCreateInput"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Community",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CommunityCard_community"
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
              (v2/*: any*/),
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
                    "name": "isVerified",
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
    ]
  },
  "params": {
    "cacheID": "15ca94a145b9cc7e2966a668303e28d7",
    "id": null,
    "metadata": {},
    "name": "CommunityCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CommunityCreateMutation(\n  $communityCreateInput: CommunityCreateInput!\n) {\n  communityCreate(communityCreateInput: $communityCreateInput) {\n    communityEdge {\n      cursor\n      node {\n        ...CommunityCard_community\n        id\n      }\n    }\n  }\n}\n\nfragment CommunityCard_community on Community {\n  id\n  name\n  isVerified\n}\n"
  }
};
})();

(node as any).hash = "bcbd75ca1e407f43d369753b33afd33b";

export default node;
