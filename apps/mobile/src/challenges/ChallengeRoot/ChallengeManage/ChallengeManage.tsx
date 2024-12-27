import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { ChallengeManage_challenge$key } from "@/__generated__/ChallengeManage_challenge.graphql";
import type { ChallengeManageQuery } from "@/__generated__/ChallengeManageQuery.graphql";
import { OImageUpload } from "@/universe/atoms";
import { OMenu, Ozone } from "@/universe/molecules";

export const CHALLENGE_MANAGE_QUERY = graphql`
  query ChallengeManageQuery($challengeId: ID!) {
    viewer {
      challenge(challengeId: $challengeId) {
        ...ChallengeManage_challenge
      }
    }
  }
`;

interface ChallengeManageProps {
  queryRef: PreloadedQuery<ChallengeManageQuery>;
}

export const ChallengeManage = ({ queryRef }: ChallengeManageProps) => {
  const data = usePreloadedQuery<ChallengeManageQuery>(
    CHALLENGE_MANAGE_QUERY,
    queryRef
  );

  const challenge = useFragment<ChallengeManage_challenge$key>(
    graphql`
      fragment ChallengeManage_challenge on Challenge {
        id
        name @required(action: THROW)
        description @required(action: THROW)
      }
    `,
    data.viewer?.challenge
  );

  const menuItems = [
    {
      label: "Name",
      value: challenge?.name ?? "No name found",
      route: "/community/challenge/(challenge-manage)/challenge-name",
    },
    {
      label: "Description",
      value: challenge?.description ?? "No description found",
      route: "/community/challenge/(challenge-manage)/challenge-description",
    },
  ];

  return (
    <Ozone>
      <View className="flex flex-col gap-md p-md">
        <OImageUpload className="mb-md" />
        <OMenu items={menuItems} className="mb-lg" />
      </View>
    </Ozone>
  );
};
