/**
 * @generated SignedSource<<83f2896e4f2c628d30b3d26b7b87ff63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
export type UserNotificationCardDeclineFriendMutation$variables = {
  connections: ReadonlyArray<string>;
  friendId: string;
};
export type UserNotificationCardDeclineFriendMutation$data = {
  readonly userDeclineFriendship: {
    readonly id: string;
    readonly status: InvitationStatus;
  };
};
export type UserNotificationCardDeclineFriendMutation = {
  response: UserNotificationCardDeclineFriendMutation$data;
  variables: UserNotificationCardDeclineFriendMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "friendId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "friendId",
    "variableName": "friendId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserNotificationCardDeclineFriendMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserFriendship",
        "kind": "LinkedField",
        "name": "userDeclineFriendship",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserNotificationCardDeclineFriendMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserFriendship",
        "kind": "LinkedField",
        "name": "userDeclineFriendship",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "id",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "98c68241622ac2fd3e621f1cd5f70f49",
    "id": null,
    "metadata": {},
    "name": "UserNotificationCardDeclineFriendMutation",
    "operationKind": "mutation",
    "text": "mutation UserNotificationCardDeclineFriendMutation(\n  $friendId: ID!\n) {\n  userDeclineFriendship(friendId: $friendId) {\n    id\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "9b2c0843e289e6f4ea865cfc55bf6906";

export default node;
