/**
 * @generated SignedSource<<854d47510bea59d97de905f653462f33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
export type UserProfileAddFriendMutation$variables = {
  friendId: string;
};
export type UserProfileAddFriendMutation$data = {
  readonly userRequestFriendship: {
    readonly id: string;
    readonly status: InvitationStatus;
  };
};
export type UserProfileAddFriendMutation = {
  response: UserProfileAddFriendMutation$data;
  variables: UserProfileAddFriendMutation$variables;
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
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "UserProfileAddFriendMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserProfileAddFriendMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a9a5475d4e24a069df87e2cc3c3cdab2",
    "id": null,
    "metadata": {},
    "name": "UserProfileAddFriendMutation",
    "operationKind": "mutation",
    "text": "mutation UserProfileAddFriendMutation(\n  $friendId: ID!\n) {\n  userRequestFriendship(friendId: $friendId) {\n    id\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "33ff306004e39a2b3b6873a92d9b15f1";

export default node;
