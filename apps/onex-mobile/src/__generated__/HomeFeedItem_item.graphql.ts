/**
 * @generated SignedSource<<e3166db28ceedb424b91bb187dc762b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentRefs } from "relay-runtime";
export type HomeFeedItem_item$data = {
  readonly __typename: "EndingSoonChallenge";
  readonly " $fragmentSpreads": FragmentRefs<"EndingSoonChallengeCard_challenge">;
  readonly " $fragmentType": "HomeFeedItem_item";
} | {
  readonly __typename: "StartingSoonChallenge";
  readonly " $fragmentSpreads": FragmentRefs<"StartingSoonChallengeCard_challenge">;
  readonly " $fragmentType": "HomeFeedItem_item";
} | {
  readonly __typename: "UserRecord";
  readonly " $fragmentSpreads": FragmentRefs<"UserRecordCard_userRecord">;
  readonly " $fragmentType": "HomeFeedItem_item";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "HomeFeedItem_item";
};
export type HomeFeedItem_item$key = {
  readonly " $data"?: HomeFeedItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFeedItem_item">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeFeedItem_item",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StartingSoonChallengeCard_challenge"
        }
      ],
      "type": "StartingSoonChallenge",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "EndingSoonChallengeCard_challenge"
        }
      ],
      "type": "EndingSoonChallenge",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UserRecordCard_userRecord"
        }
      ],
      "type": "UserRecord",
      "abstractKey": null
    }
  ],
  "type": "HomeFeedItem",
  "abstractKey": "__isHomeFeedItem"
};
})();

(node as any).hash = "b670aa34177e0223e4baa57543cafcca";

export default node;
