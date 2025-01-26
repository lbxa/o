import { graphql, useFragment } from "react-relay";

import type { HomeFeedItem_item$key } from "@/__generated__/HomeFeedItem_item.graphql";
import { StartingSoonChallengeCard } from "@/challenges";
import { EndingSoonChallengeCard } from "@/challenges/ChallengeCard/EndingSoonChallengeCard";
import { UserRecordCard } from "@/users";

interface HomeFeedItemProps {
  fragmentRef: HomeFeedItem_item$key;
}
export const HomeFeedItem = ({ fragmentRef }: HomeFeedItemProps) => {
  const item = useFragment(
    graphql`
      fragment HomeFeedItem_item on HomeFeedItem {
        ... on StartingSoonChallenge {
          __typename
          ...StartingSoonChallengeCard_challenge
        }
        ... on EndingSoonChallenge {
          __typename
          ...EndingSoonChallengeCard_challenge
        }
        ... on UserRecord {
          __typename
          ...UserRecordCard_userRecord
        }
      }
    `,
    fragmentRef
  );

  switch (item.__typename) {
    case "StartingSoonChallenge":
      return <StartingSoonChallengeCard fragmentRef={item} />;
    case "EndingSoonChallenge":
      return <EndingSoonChallengeCard fragmentRef={item} />;
    case "UserRecord":
      return <UserRecordCard fragmentRef={item} />;
    default:
      return null;
  }
};
