/**
 * @generated SignedSource<<231ebdc81fd85514e8666e078e4f238f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
export type UserNotificationCardAcceptFriendMutation$variables = {
  connections: ReadonlyArray<string>;
  friendId: string;
};
export type UserNotificationCardAcceptFriendMutation$data = {
  readonly userAcceptFriendship: {
    readonly id: string;
    readonly status: InvitationStatus;
  };
};
export type UserNotificationCardAcceptFriendMutation = {
  response: UserNotificationCardAcceptFriendMutation$data;
  variables: UserNotificationCardAcceptFriendMutation$variables;
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
    "name": "UserNotificationCardAcceptFriendMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserFriendship",
        "kind": "LinkedField",
        "name": "userAcceptFriendship",
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
    "name": "UserNotificationCardAcceptFriendMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "UserFriendship",
        "kind": "LinkedField",
        "name": "userAcceptFriendship",
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
    "cacheID": "1f60aa1b5e4af2ff43d4c8513c59337a",
    "id": null,
    "metadata": {},
    "name": "UserNotificationCardAcceptFriendMutation",
    "operationKind": "mutation",
    "text": "mutation UserNotificationCardAcceptFriendMutation(\n  $friendId: ID!\n) {\n  userAcceptFriendship(friendId: $friendId) {\n    id\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "e4301aa6bcfbf0339f3b551c6c15d04e";

export default node;
