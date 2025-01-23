/**
 * @generated SignedSource<<7ed69e77ccfccffca0540410a847c973>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityInvitationAcceptCard_communityJoinMutation$variables = {
  communityConnections: ReadonlyArray<string>;
  inviteConnections: ReadonlyArray<string>;
  inviteId: string;
};
export type CommunityInvitationAcceptCard_communityJoinMutation$data = {
  readonly communityJoin: {
    readonly communityEdge: {
      readonly cursor: string;
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"CommunityCard_community">;
      };
    };
    readonly invitationId: string;
  };
};
export type CommunityInvitationAcceptCard_communityJoinMutation = {
  response: CommunityInvitationAcceptCard_communityJoinMutation$data;
  variables: CommunityInvitationAcceptCard_communityJoinMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "communityConnections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inviteConnections"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inviteId"
},
v3 = [
  {
    "kind": "Variable",
    "name": "inviteId",
    "variableName": "inviteId"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "invitationId",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityInvitationAcceptCard_communityJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CommunityJoinPayload",
        "kind": "LinkedField",
        "name": "communityJoin",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CommunityEdge",
            "kind": "LinkedField",
            "name": "communityEdge",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Community",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CommunityCard_community"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CommunityInvitationAcceptCard_communityJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "CommunityJoinPayload",
        "kind": "LinkedField",
        "name": "communityJoin",
        "plural": false,
        "selections": [
          (v4/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CommunityEdge",
            "kind": "LinkedField",
            "name": "communityEdge",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Community",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isVerified",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "memberCount",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "communityEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "communityConnections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2234a6368685b828db148111a8d48a84",
    "id": null,
    "metadata": {},
    "name": "CommunityInvitationAcceptCard_communityJoinMutation",
    "operationKind": "mutation",
    "text": "mutation CommunityInvitationAcceptCard_communityJoinMutation(\n  $inviteId: ID!\n) {\n  communityJoin(inviteId: $inviteId) {\n    invitationId\n    communityEdge {\n      cursor\n      node {\n        ...CommunityCard_community\n        id\n      }\n    }\n  }\n}\n\nfragment CommunityCard_community on Community {\n  id\n  name\n  isVerified\n  memberCount\n}\n"
  }
};
})();

(node as any).hash = "0bf311502b17e1de4699865c0c337323";

export default node;
