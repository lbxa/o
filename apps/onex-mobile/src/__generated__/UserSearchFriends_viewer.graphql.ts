/**
 * @generated SignedSource<<2b288cec2bf3c0c02da78d98f905fd38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserSearchFriends_viewer$data = {
  readonly user: {
    readonly searchFriends: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"UserProfileCard_user">;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "UserSearchFriends_viewer";
};
export type UserSearchFriends_viewer$key = {
  readonly " $data"?: UserSearchFriends_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserSearchFriends_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "searchTerm"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": require('./UserSearchRefetchQuery.graphql')
    }
  },
  "name": "UserSearchFriends_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "searchTerm",
              "variableName": "searchTerm"
            }
          ],
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "searchFriends",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "UserProfileCard_user"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "716d87bda603763be46cd774040c68fc";

export default node;
