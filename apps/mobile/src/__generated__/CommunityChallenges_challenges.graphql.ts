/**
 * @generated SignedSource<<f17b2408faf5924faaa1a711a0599f96>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type CommunityChallenges_challenges$data = {
  readonly challenges: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeFragment">;
  }> | null | undefined;
  readonly " $fragmentType": "CommunityChallenges_challenges";
};
export type CommunityChallenges_challenges$key = {
  readonly " $data"?: CommunityChallenges_challenges$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityChallenges_challenges">;
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
      "operation": require('./CommunityChallengesRefreshQuery.graphql')
    }
  },
  "name": "CommunityChallenges_challenges",
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

(node as any).hash = "a2716b030b1dbbdaa5b0c15a62b37c72";

export default node;
