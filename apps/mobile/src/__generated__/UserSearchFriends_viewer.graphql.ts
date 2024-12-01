/**
 * @generated SignedSource<<02f7be352d3ab9d33492f238054a7a91>>
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
      readonly " $fragmentSpreads": FragmentRefs<"UserInviteCard_user">;
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
              "name": "UserInviteCard_user"
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

(node as any).hash = "54d571a44dc3c53ae15a03e6104e1945";

export default node;
