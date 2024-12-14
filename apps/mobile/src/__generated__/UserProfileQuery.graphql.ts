/**
 * @generated SignedSource<<c5c811a7eae65998d5ebcfd9443157d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfileQuery$variables = {
  userId: string;
  viewerId: string;
};
export type UserProfileQuery$data = {
  readonly getFriendshipStatus: {
    readonly " $fragmentSpreads": FragmentRefs<"UserProfile_userFriendshipStatus">;
  } | null | undefined;
  readonly userProfile: {
    readonly " $fragmentSpreads": FragmentRefs<"UserProfile_user">;
  } | null | undefined;
};
export type UserProfileQuery = {
  response: UserProfileQuery$data;
  variables: UserProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "viewerId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "friendId",
    "variableName": "userId"
  },
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "viewerId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "userProfile",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserProfile_user"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserFriendshipStatus",
        "kind": "LinkedField",
        "name": "getFriendshipStatus",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserProfile_userFriendshipStatus"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "userProfile",
        "plural": false,
        "selections": [
          (v3/*: any*/),
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
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserFriendshipStatus",
        "kind": "LinkedField",
        "name": "getFriendshipStatus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserFriendship",
            "kind": "LinkedField",
            "name": "outgoing",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UserFriendship",
            "kind": "LinkedField",
            "name": "incoming",
            "plural": false,
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "areMutualFriends",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "822764c932930b97bf4518f7e72bbb6f",
    "id": null,
    "metadata": {},
    "name": "UserProfileQuery",
    "operationKind": "query",
    "text": "query UserProfileQuery(\n  $userId: ID!\n  $viewerId: ID!\n) {\n  userProfile(id: $userId) {\n    ...UserProfile_user\n    id\n  }\n  getFriendshipStatus(userId: $viewerId, friendId: $userId) {\n    ...UserProfile_userFriendshipStatus\n  }\n}\n\nfragment UserProfileStats_user on User {\n  buddyCount\n  followerCount\n  challengeActivityResultsCount\n}\n\nfragment UserProfile_user on User {\n  id\n  firstName\n  lastName\n  handle\n  bio\n  ...UserProfileStats_user\n}\n\nfragment UserProfile_userFriendshipStatus on UserFriendshipStatus {\n  outgoing {\n    id\n    status\n  }\n  incoming {\n    id\n    status\n  }\n  areMutualFriends\n}\n"
  }
};
})();

(node as any).hash = "83e853c05c003a6de71e6a525ef40ec3";

export default node;
