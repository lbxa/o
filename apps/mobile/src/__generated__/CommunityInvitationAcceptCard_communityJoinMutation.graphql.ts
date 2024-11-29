/**
 * @generated SignedSource<<c25741dcf15d84a0d89ffa5eecb9eb0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityInvitationAcceptCard_communityJoinMutation$variables = {
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
  };
};
export type CommunityInvitationAcceptCard_communityJoinMutation = {
  response: CommunityInvitationAcceptCard_communityJoinMutation$data;
  variables: CommunityInvitationAcceptCard_communityJoinMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inviteId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "inviteId",
    "variableName": "inviteId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityInvitationAcceptCard_communityJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommunityJoinPayload",
        "kind": "LinkedField",
        "name": "communityJoin",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommunityEdge",
            "kind": "LinkedField",
            "name": "communityEdge",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommunityInvitationAcceptCard_communityJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommunityJoinPayload",
        "kind": "LinkedField",
        "name": "communityJoin",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CommunityEdge",
            "kind": "LinkedField",
            "name": "communityEdge",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "12717b0ea13bfc83548f2cc963877a64",
    "id": null,
    "metadata": {},
    "name": "CommunityInvitationAcceptCard_communityJoinMutation",
    "operationKind": "mutation",
    "text": "mutation CommunityInvitationAcceptCard_communityJoinMutation(\n  $inviteId: ID!\n) {\n  communityJoin(inviteId: $inviteId) {\n    communityEdge {\n      cursor\n      node {\n        ...CommunityCard_community\n        id\n      }\n    }\n  }\n}\n\nfragment CommunityCard_community on Community {\n  id\n  name\n  isVerified\n}\n"
  }
};
})();

(node as any).hash = "f96ae4713ad9798d7765066ed38b39be";

export default node;
