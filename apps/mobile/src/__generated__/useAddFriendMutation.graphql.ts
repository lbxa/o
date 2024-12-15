/**
 * @generated SignedSource<<8cd3066e9df95710841119c395e45ff6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
export type useAddFriendMutation$variables = {
  friendId: string;
};
export type useAddFriendMutation$data = {
  readonly userRequestFriendship: {
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "friendId",
        "variableName": "friendId"
      }
    ],
    "concreteType": "UserFriendship",
    "kind": "LinkedField",
    "name": "userRequestFriendship",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "friend",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useAddFriendMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useAddFriendMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "8af9d37e9f8e08cb4eb36ba8d4f14dcb",
    "id": null,
    "metadata": {},
    "name": "useAddFriendMutation",
    "operationKind": "mutation",
    "text": "mutation useAddFriendMutation(\n  $friendId: ID!\n) {\n  userRequestFriendship(friendId: $friendId) {\n    id\n    user {\n      id\n    }\n    friend {\n      id\n    }\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b6722fb064bcd96949e2a6cb7211381";

export default node;
