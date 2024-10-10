/**
 * @generated SignedSource<<f0dfe0ec37952cb2d05375b330526a1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChallengeDetailsQuery$variables = {
  id: string;
};
export type ChallengeDetailsQuery$data = {
  readonly challenge: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeFragment">;
  } | null | undefined;
};
export type ChallengeDetailsQuery = {
  response: ChallengeDetailsQuery$data;
  variables: ChallengeDetailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChallengeDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Challenge",
        "kind": "LinkedField",
        "name": "challenge",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChallengeFragment"
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
    "name": "ChallengeDetailsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Challenge",
        "kind": "LinkedField",
        "name": "challenge",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94009cccbdcaafb4ab2df89dac209ca4",
    "id": null,
    "metadata": {},
    "name": "ChallengeDetailsQuery",
    "operationKind": "query",
    "text": "query ChallengeDetailsQuery(\n  $id: ID!\n) {\n  challenge(id: $id) {\n    name\n    ...ChallengeFragment\n    id\n  }\n}\n\nfragment ChallengeFragment on Challenge {\n  id\n  name\n  description\n  startDate\n  endDate\n}\n"
  }
};
})();

(node as any).hash = "f288f82b4a806ea677b8c080756663fb";

export default node;
