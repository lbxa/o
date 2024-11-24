/**
 * @generated SignedSource<<39c924611c6cbbe30a0488c24f002773>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import type { FragmentRefs } from "relay-runtime";

const node: any = {};

(node as any).hash = "8519dbd9a87a8e0d6b8805fbc4e68c5c";

export default node;

module.exports.validate = function validate(value: {
  readonly __typename: string;
  readonly __id: string;
  readonly " $fragmentSpreads": UserLoginFragment_viewer_assignable$fragmentType;
}): false | {
  readonly __typename: "User";
  readonly __id: string;
  readonly " $fragmentSpreads": UserLoginFragment_viewer_assignable$fragmentType;
} {
  return value.__typename === 'User' ? value : false;
};
