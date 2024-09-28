/**
 * @generated SignedSource<<5d3a2e4c79b042d3ea76afef46213c73>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type UserInviteCardMutation$variables = {
  communityId: string;
  userId: string;
};
export type UserInviteCardMutation$data = {
  readonly communityInvite: boolean;
};
export type UserInviteCardMutation = {
  response: UserInviteCardMutation$data;
  variables: UserInviteCardMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "communityId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "communityId",
        "variableName": "communityId"
      },
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "kind": "ScalarField",
    "name": "communityInvite",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserInviteCardMutation",
    "selections": (v2/*: any*/),
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
    "name": "UserInviteCardMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "601f37837fa977a3476612fcc7c6c5dd",
    "id": null,
    "metadata": {},
    "name": "UserInviteCardMutation",
    "operationKind": "mutation",
    "text": "mutation UserInviteCardMutation(\n  $userId: ID!\n  $communityId: ID!\n) {\n  communityInvite(userId: $userId, communityId: $communityId)\n}\n"
  }
};
})();

(node as any).hash = "8d3e5e848ddc36d615f723311ff705b6";

export default node;
