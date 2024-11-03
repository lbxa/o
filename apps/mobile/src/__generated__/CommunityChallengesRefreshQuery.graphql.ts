/**
 * @generated SignedSource<<8798d94ec8117944551f49556674f6fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ConcreteRequest } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityChallengesRefreshQuery$variables = {
  communityId: string;
};
export type CommunityChallengesRefreshQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"CommunityChallenges_challenges">;
  } | null | undefined;
};
export type CommunityChallengesRefreshQuery = {
  response: CommunityChallengesRefreshQuery$data;
  variables: CommunityChallengesRefreshQuery$variables;
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
    "name": "CommunityChallengesRefreshQuery",
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
    "name": "CommunityChallengesRefreshQuery",
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
    "cacheID": "1deb93963690c8fab88347c423fe9778",
    "id": null,
    "metadata": {},
    "name": "CommunityChallengesRefreshQuery",
    "operationKind": "query",
    "text": "query CommunityChallengesRefreshQuery(\n  $communityId: ID!\n) {\n  viewer {\n    ...CommunityChallenges_challenges_160FAT\n  }\n}\n\nfragment ChallengeFragment on Challenge {\n  id\n  name\n  description\n  startDate\n  endDate\n  activity {\n    id\n    type\n    measurement\n    goal\n    unit\n    target\n  }\n}\n\nfragment CommunityChallenges_challenges_160FAT on Viewer {\n  challenges(communityId: $communityId) {\n    ...ChallengeFragment\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a2716b030b1dbbdaa5b0c15a62b37c72";

export default node;
