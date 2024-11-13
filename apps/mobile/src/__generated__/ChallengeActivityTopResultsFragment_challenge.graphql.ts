/**
 * @generated SignedSource<<aa5b6482813e680f6e49df66127ff61c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
export type ChallengeActivityMeasurement = "COUNTING" | "DURATION" | "IMPROVEMENT" | "%future added value";
import type { FragmentRefs } from "relay-runtime";
export type ChallengeActivityTopResultsFragment_challenge$data = {
  readonly activityTopResults: ReadonlyArray<{
    readonly activity: {
      readonly id: string;
      readonly measurement: ChallengeActivityMeasurement;
    };
    readonly id: string;
    readonly result: number;
    readonly user: {
      readonly firstName: string | null | undefined;
      readonly id: string;
      readonly lastName: string | null | undefined;
    };
  }> | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "ChallengeActivityTopResultsFragment_challenge";
};
export type ChallengeActivityTopResultsFragment_challenge$key = {
  readonly " $data"?: ChallengeActivityTopResultsFragment_challenge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeActivityTopResultsFragment_challenge">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "challengeId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./ChallengeActivityTopResultsRefetchQuery.graphql'),
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "ChallengeActivityTopResultsFragment_challenge",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "challengeId",
          "variableName": "challengeId"
        }
      ],
      "concreteType": "ChallengeActivityResult",
      "kind": "LinkedField",
      "name": "activityTopResults",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "User",
          "kind": "LinkedField",
          "name": "user",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "firstName",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lastName",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "result",
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "measurement",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Challenge",
  "abstractKey": null
};
})();

(node as any).hash = "d36d60effacf3061970e47b3d611b842";

export default node;
