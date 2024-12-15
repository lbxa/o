import React from "react";
import { graphql, useFragment } from "react-relay";

import type { ChallengeHeader_challenge$key } from "@/__generated__/ChallengeHeader_challenge.graphql";

import { SharedHeaderTitle } from "../../shared";

export const ChallengeHeader: React.FC<{
  fragmentRef: ChallengeHeader_challenge$key;
}> = ({ fragmentRef }) => {
  const challenge = useFragment<ChallengeHeader_challenge$key>(
    graphql`
      fragment ChallengeHeader_challenge on Challenge {
        id
        name
      }
    `,
    fragmentRef
  );

  return <SharedHeaderTitle title={challenge.name} ellipsize />;
};
