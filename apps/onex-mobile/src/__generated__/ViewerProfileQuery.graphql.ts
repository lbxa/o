/**
 * @generated SignedSource<<299ecd6647900e6027c4eea2a377bd30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ViewerProfileQuery$variables = Record<PropertyKey, never>;
export type ViewerProfileQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewerProfile_viewer">;
  } | null | undefined;
};
export type ViewerProfileQuery = {
  response: ViewerProfileQuery$data;
  variables: ViewerProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewerProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewerProfile_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ViewerProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "firstName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "handle",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bio",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "quality",
                    "value": "HIGH"
                  }
                ],
                "kind": "ScalarField",
                "name": "avatarUrl",
                "storageKey": "avatarUrl(quality:\"HIGH\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "buddyCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "followerCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "challengeActivityResultsCount",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "45fbfde1f5f4ba0b49b7a512f00a3529",
    "id": null,
    "metadata": {},
    "name": "ViewerProfileQuery",
    "operationKind": "query",
    "text": "query ViewerProfileQuery {\n  viewer {\n    ...ViewerProfile_viewer\n    id\n  }\n}\n\nfragment UserProfileStats_user on User {\n  buddyCount\n  followerCount\n  challengeActivityResultsCount\n}\n\nfragment ViewerProfile_viewer on Viewer {\n  user {\n    id\n    firstName\n    lastName\n    handle\n    bio\n    avatarUrl(quality: HIGH)\n    ...UserProfileStats_user\n  }\n}\n"
  }
};
})();

(node as any).hash = "b707fe595e2c36fff806ddef8d9f4dd1";

export default node;
