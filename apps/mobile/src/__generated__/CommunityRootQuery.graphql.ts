/**
 * @generated SignedSource<<0d68b9e360b64da0f04849411bb19787>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityRootQuery$variables = {
  communityId: string;
};
export type CommunityRootQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"CommunityChallenges_challenges">;
  } | null | undefined;
};
export type CommunityRootQuery = {
  response: CommunityRootQuery$data;
  variables: CommunityRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "communityId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "communityId",
    "variableName": "communityId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CommunityRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": (v1/*: any*/),
            "kind": "FragmentSpread",
            "name": "CommunityChallenges_challenges"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CommunityRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Challenge",
            "kind": "LinkedField",
            "name": "challenges",
            "plural": true,
            "selections": [
              (v2/*: any*/),
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
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ChallengeActivity",
                "kind": "LinkedField",
                "name": "activity",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "measurement",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "goal",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "unit",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "target",
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
    "cacheID": "b756d38e268848071371684dca9ca5de",
    "id": null,
    "metadata": {},
    "name": "CommunityRootQuery",
    "operationKind": "query",
    "text": "query CommunityRootQuery(\n  $communityId: ID!\n) {\n  viewer {\n    ...CommunityChallenges_challenges_160FAT\n  }\n}\n\nfragment ChallengeFragment on Challenge {\n  id\n  name\n  description\n  startDate\n  endDate\n  activity {\n    id\n    type\n    measurement\n    goal\n    unit\n    target\n  }\n}\n\nfragment CommunityChallenges_challenges_160FAT on Viewer {\n  challenges(communityId: $communityId) {\n    ...ChallengeFragment\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "68c0c84e0e1cec53a10270e6c2eb7b0b";

export default node;
