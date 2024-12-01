/**
 * @generated SignedSource<<9c0e2f7929d1f6a64d2bbe0b3fe69f6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
export type useCommunityInviteDeny_communityInviteDenyMutation$variables = {
  inviteConnections: ReadonlyArray<string>;
  inviteId: string;
};
export type useCommunityInviteDeny_communityInviteDenyMutation$data = {
  readonly communityInviteDeny: {
    readonly invitationId: string;
  };
};
export type useCommunityInviteDeny_communityInviteDenyMutation = {
  response: useCommunityInviteDeny_communityInviteDenyMutation$data;
  variables: useCommunityInviteDeny_communityInviteDenyMutation$variables;
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
    "name": "useCommunityInviteDeny_communityInviteDenyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommunityInviteDenyPayload",
        "kind": "LinkedField",
        "name": "communityInviteDeny",
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
    "name": "useCommunityInviteDeny_communityInviteDenyMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommunityInviteDenyPayload",
        "kind": "LinkedField",
        "name": "communityInviteDeny",
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
    "cacheID": "eb0d99eca4e4cdc7eaca004caaa86493",
    "id": null,
    "metadata": {},
    "name": "useCommunityInviteDeny_communityInviteDenyMutation",
    "operationKind": "mutation",
    "text": "mutation useCommunityInviteDeny_communityInviteDenyMutation(\n  $inviteId: ID!\n) {\n  communityInviteDeny(inviteId: $inviteId) {\n    invitationId\n  }\n}\n"
  }
};
})();

(node as any).hash = "85f53db3cbe4b6bef0ded7a996b7c373";

export default node;
