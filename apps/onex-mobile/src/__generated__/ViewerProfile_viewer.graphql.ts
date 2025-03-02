/**
 * @generated SignedSource<<8478021f92b8f2714f938f0243fa0ed0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type ViewerProfile_viewer$data = {
  readonly user: {
    readonly avatarUrl: string | null | undefined;
    readonly bio: string | null | undefined;
    readonly firstName: string | null | undefined;
    readonly handle: string | null | undefined;
    readonly id: string;
    readonly lastName: string | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"UserProfileStats_user">;
  } | null | undefined;
  readonly " $fragmentType": "ViewerProfile_viewer";
};
export type ViewerProfile_viewer$key = {
  readonly " $data"?: ViewerProfile_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewerProfile_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewerProfile_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "user",
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
          "name": "firstName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "handle",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "quality",
              "value": "HIGH"
            }
          ],
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": "avatarUrl(quality:\"HIGH\")"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserProfileStats_user"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "5aed9954b57486c159f807cbdf73ae7b";

export default node;
