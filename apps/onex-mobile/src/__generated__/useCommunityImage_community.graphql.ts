/**
 * @generated SignedSource<<ca2aca236352f22400e587823fcd76ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { FragmentRefs } from "relay-runtime";

const node: any = {};

(node as any).hash = "0a514dda4349ea24faf4e9da652d1173";

export default node;

module.exports.validate = function validate(value: {
  readonly __typename: string;
  readonly __id: string;
  readonly " $fragmentSpreads": useCommunityImage_community$fragmentType;
}): false | {
  readonly __typename: "Community";
  readonly __id: string;
  readonly " $fragmentSpreads": useCommunityImage_community$fragmentType;
} {
  return value.__typename === 'Community' ? value : false;
};
