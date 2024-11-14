/**
 * @generated SignedSource<<99d820bce72e604fd63ab7c876fd69cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ChallengeList_challenges$data = {
  readonly challenges: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeFragment">;
  }> | null | undefined;
  readonly " $fragmentType": "ChallengeList_challenges";
};
export type ChallengeList_challenges$key = {
  readonly " $data"?: ChallengeList_challenges$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChallengeList_challenges">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "communityId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "viewer"
      ],
      "operation": require('./ChallengeListRefreshQuery.graphql')
    }
  },
  "name": "ChallengeList_challenges",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "communityId",
          "variableName": "communityId"
        }
      ],
      "concreteType": "Challenge",
      "kind": "LinkedField",
      "name": "challenges",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ChallengeFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "243029b73c8fd58d978f8e29a1366d57";

export default node;
