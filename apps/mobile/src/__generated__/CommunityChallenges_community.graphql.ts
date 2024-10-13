/**
 * @generated SignedSource<<775c3b29c2e64e3771e963d97d162c88>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommunityChallenges_community$data = {
  readonly challenges: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChallengeFragment">;
  }> | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "CommunityChallenges_community";
};
export type CommunityChallenges_community$key = {
  readonly " $data"?: CommunityChallenges_community$data;
  readonly " $fragmentSpreads": FragmentRefs<"CommunityChallenges_community">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./CommunityChallengesRefreshQuery.graphql'),
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    }
  },
  "name": "CommunityChallenges_community",
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
  "type": "Community",
  "abstractKey": null
};

(node as any).hash = "f5d66861e423d451b81e550e89e06003";

export default node;
