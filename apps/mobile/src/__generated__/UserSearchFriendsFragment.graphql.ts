/**
 * @generated SignedSource<<8ae055563bb5c3154eeff4a38fbd4e63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSearchFriendsFragment$data = {
  readonly user: {
    readonly searchFriends: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "UserSearchFriendsFragment";
};
export type UserSearchFriendsFragment$key = {
  readonly " $data"?: UserSearchFriendsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserSearchFriendsFragment">;
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
  "name": "UserSearchFriendsFragment",
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
              "name": "UserFragment"
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

(node as any).hash = "97aa3055a937414e98a0efdd692967e7";

export default node;
