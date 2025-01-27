/**
 * @generated SignedSource<<260ed94b8832cbaa5144adf3c2338d1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type InvitationStatus = "ACCEPTED" | "DECLINED" | "PENDING" | "%future added value";
export type useAcceptFriendMutation$variables = {
  friendId: string;
};
export type useAcceptFriendMutation$data = {
  readonly userAcceptFriendship: {
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
export type useAcceptFriendMutation = {
  response: useAcceptFriendMutation$data;
  variables: useAcceptFriendMutation$variables;
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
    "name": "userAcceptFriendship",
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
    "name": "useAcceptFriendMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useAcceptFriendMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "b06677b78a70f4cd366630ae02053354",
    "id": null,
    "metadata": {},
    "name": "useAcceptFriendMutation",
    "operationKind": "mutation",
    "text": "mutation useAcceptFriendMutation(\n  $friendId: ID!\n) {\n  userAcceptFriendship(friendId: $friendId) {\n    id\n    user {\n      id\n    }\n    friend {\n      id\n    }\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "f78459306185dd142b93b38459da1004";

export default node;
