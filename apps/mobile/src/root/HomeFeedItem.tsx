import { graphql, useFragment } from "react-relay";

import type { HomeFeedItem_item$key } from "@/__generated__/HomeFeedItem_item.graphql";
import { ChallengeCard } from "@/challenges";
import { UserRecordCard } from "@/users";

interface HomeFeedItemProps {
  fragmentRef: HomeFeedItem_item$key;
}
export const HomeFeedItem = ({ fragmentRef }: HomeFeedItemProps) => {
  const item = useFragment(
    graphql`
      fragment HomeFeedItem_item on HomeFeedItem {
        ... on Challenge {
          __typename
          ...ChallengeCard_challenge
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
    case "Challenge":
      return <ChallengeCard fragmentRef={item} />;
    case "UserRecord":
      return <UserRecordCard fragmentRef={item} />;
    default:
      return null;
  }
};
