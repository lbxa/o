/**
 * @generated SignedSource<<631a2765e905f5b4e5e161d4d8b26719>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type useCommunityInviteDecline_communityInviteDeclineMutation$variables = {
  inviteConnections: ReadonlyArray<string>;
  inviteId: string;
};
export type useCommunityInviteDecline_communityInviteDeclineMutation$data = {
  readonly communityInviteDecline: {
    readonly invitationId: string;
  };
};
export type useCommunityInviteDecline_communityInviteDeclineMutation = {
  response: useCommunityInviteDecline_communityInviteDeclineMutation$data;
  variables: useCommunityInviteDecline_communityInviteDeclineMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inviteConnections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inviteId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "inviteId",
    "variableName": "inviteId"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invitationId",
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
    "name": "useCommunityInviteDecline_communityInviteDeclineMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommunityInviteDenyPayload",
        "kind": "LinkedField",
        "name": "communityInviteDecline",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "useCommunityInviteDecline_communityInviteDeclineMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommunityInviteDenyPayload",
        "kind": "LinkedField",
        "name": "communityInviteDecline",
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
            "name": "invitationId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "inviteConnections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1918db3541754c06a503529af2b77661",
    "id": null,
    "metadata": {},
    "name": "useCommunityInviteDecline_communityInviteDeclineMutation",
    "operationKind": "mutation",
    "text": "mutation useCommunityInviteDecline_communityInviteDeclineMutation(\n  $inviteId: ID!\n) {\n  communityInviteDecline(inviteId: $inviteId) {\n    invitationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "822cc7b6fea7732ab10e28324898e9d5";

export default node;
