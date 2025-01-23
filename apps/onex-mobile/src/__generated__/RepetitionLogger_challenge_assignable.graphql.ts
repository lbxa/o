/**
 * @generated SignedSource<<f49a0053e55057d43390e8cfb65f2b7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { FragmentRefs } from "relay-runtime";

const node: any = {};

(node as any).hash = "c68dd4f76b127da8f1e9922c22109f5f";

export default node;

module.exports.validate = function validate(value: {
  readonly __typename: string;
  readonly __id: string;
  readonly " $fragmentSpreads": RepetitionLogger_challenge_assignable$fragmentType;
}): false | {
  readonly __typename: "Challenge";
  readonly __id: string;
  readonly " $fragmentSpreads": RepetitionLogger_challenge_assignable$fragmentType;
} {
  return value.__typename === 'Challenge' ? value : false;
};
