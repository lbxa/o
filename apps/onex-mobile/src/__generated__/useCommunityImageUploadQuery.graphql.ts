/**
 * @generated SignedSource<<37cb9a47d19755aa58898245e894efdc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteUpdatableQuery } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type useCommunityImageUploadQuery$variables = {
  communityId: string;
};
export type useCommunityImageUploadQuery$data = {
  get viewer(): {
    get community(): {
      imageUrl: string | null | undefined;
    } | null | undefined;
    set community(value: {
      readonly __typename: "Community";
      readonly __id: string;
      readonly " $fragmentSpreads": FragmentRefs<"useCommunityImage_community">;
    } | null | undefined);
  } | null | undefined;
  set viewer(value: null | undefined);
};
export type useCommunityImageUploadQuery = {
  response: useCommunityImageUploadQuery$data;
  variables: useCommunityImageUploadQuery$variables;
};

const node: ConcreteUpdatableQuery = {
  "fragment": {
    "argumentDefinitions": [
      {
        "defaultValue": null,
        "kind": "LocalArgument",
        "name": "communityId"
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCommunityImageUploadQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "communityId",
                "variableName": "communityId"
              }
            ],
            "concreteType": "Community",
            "kind": "LinkedField",
            "name": "community",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "imageUrl",
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "useCommunityImage_community"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "UpdatableQuery"
};

(node as any).hash = "664601331e6c08ae51c80664febe0da9";

export default node;
