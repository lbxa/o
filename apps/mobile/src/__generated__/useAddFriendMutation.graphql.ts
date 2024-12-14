/**
 * @generated SignedSource<<29cae67ed065d29e1a6dc3ee7371fa48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
export type useAddFriendMutation$variables = {
  friendId: string;
};
export type useAddFriendMutation$data = {
  readonly userRequestFriendship: {
    readonly $updatableFragmentSpreads: FragmentRefs<"UserProfile_updatable_userFriendship">;
    readonly friend: {
      readonly id: string;
    };
    readonly id: string;
    readonly status: InvitationStatus;
    readonly user: {
      readonly id: string;
    };
  };
};
export type useAddFriendMutation = {
  response: useAddFriendMutation$data;
  variables: useAddFriendMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "friendId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "friendId",
    "variableName": "friendId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "user",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "friend",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useAddFriendMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserFriendship",
        "kind": "LinkedField",
        "name": "userRequestFriendship",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "UserProfile_updatable_userFriendship"
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
    "name": "useAddFriendMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserFriendship",
        "kind": "LinkedField",
        "name": "userRequestFriendship",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "444a8f9d45519c4cfdf58dadac8a3783",
    "id": null,
    "metadata": {},
    "name": "useAddFriendMutation",
    "operationKind": "mutation",
    "text": "mutation useAddFriendMutation(\n  $friendId: ID!\n) {\n  userRequestFriendship(friendId: $friendId) {\n    id\n    user {\n      id\n    }\n    friend {\n      id\n    }\n    status\n    __typename\n  }\n}\n"
  }
};
})();

(node as any).hash = "b05f2fde7c5c79e434acedc06b57aa22";

export default node;
