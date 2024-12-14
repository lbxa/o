/**
 * @generated SignedSource<<5aa716310bf298b95a73d37c265028b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type UserProfileStats_user$data = {
  readonly buddyCount: number | null | undefined;
  readonly challengeActivityResultsCount: number | null | undefined;
  readonly followerCount: number | null | undefined;
  readonly " $fragmentType": "UserProfileStats_user";
};
export type UserProfileStats_user$key = {
  readonly " $data"?: UserProfileStats_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserProfileStats_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserProfileStats_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "buddyCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "followerCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "challengeActivityResultsCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "5a6efb5e755422773cc48c3f64fc35de";

export default node;
