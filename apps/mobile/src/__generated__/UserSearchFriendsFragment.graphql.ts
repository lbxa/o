/**
 * @generated SignedSource<<6faa6ca5ef4b9be9e77dda00e2fd26cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSearchFriendsFragment$data = {
  readonly id: string;
  readonly searchFriends: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"UserFragment">;
  }>;
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
        "node"
      ],
      "operation": require('./UserSearchRefetchQuery.graphql'),
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "UserSearchFriendsFragment",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "feb75911bbece4d8a705beb755c77426";

export default node;
