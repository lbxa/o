/**
 * @generated SignedSource<<9072a43da8e2e7759cbd973923f91288>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserInviteSearchFriends_viewer$data = {
  readonly user: {
    readonly searchFriends: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"UserInviteCard_user">;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "UserInviteSearchFriends_viewer";
};
export type UserInviteSearchFriends_viewer$key = {
  readonly " $data"?: UserInviteSearchFriends_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserInviteSearchFriends_viewer">;
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
      "operation": require('./UserInviteSearchRefetchQuery.graphql')
    }
  },
  "name": "UserInviteSearchFriends_viewer",
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

(node as any).hash = "c818bcd828e0d5d3d1e8d2db8a87e7b4";

export default node;
