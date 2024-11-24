/**
 * @generated SignedSource<<81bbe1cfeaf4b09ea92253ec70848850>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { FragmentRefs } from "relay-runtime";

const node: any = {};

(node as any).hash = "c31c3ba47fe417c5fb986880b44d0247";

export default node;

module.exports.validate = function validate(value: {
  readonly __typename: string;
  readonly __id: string;
  readonly " $fragmentSpreads": UserCreateFragment_viewer_assignable$fragmentType;
}): false | {
  readonly __typename: "User";
  readonly __id: string;
  readonly " $fragmentSpreads": UserCreateFragment_viewer_assignable$fragmentType;
} {
  return value.__typename === 'User' ? value : false;
};
