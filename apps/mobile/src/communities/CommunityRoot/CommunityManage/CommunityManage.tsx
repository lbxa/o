import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { CommunityManage_community$key } from "@/__generated__/CommunityManage_community.graphql";
import type { CommunityManageQuery } from "@/__generated__/CommunityManageQuery.graphql";
import { OImageUpload } from "@/universe/atoms";
import { OMenu } from "@/universe/molecules";
import { Ozone } from "@/universe/molecules/Ozone";

export const COMMUNITY_MANAGE_QUERY = graphql`
  query CommunityManageQuery($communityId: ID!) {
    viewer {
      community(communityId: $communityId) {
        ...CommunityManage_community
      }
    }
  }
`;

interface CommunityManageProps {
  queryRef: PreloadedQuery<CommunityManageQuery>;
}

export const CommunityManage = ({ queryRef }: CommunityManageProps) => {
  const data = usePreloadedQuery<CommunityManageQuery>(
    COMMUNITY_MANAGE_QUERY,
    queryRef
  );

  const community = useFragment<CommunityManage_community$key>(
    graphql`
      fragment CommunityManage_community on Community {
        id
        name @required(action: THROW)
        isPublic @required(action: THROW)
      }
    `,
    data.viewer?.community
  );

  const menuItems = [
    {
      label: "Name",
      value: community?.name,
      route: "/(root)/community/community-manage/community-name",
    },
    {
      label: "Visibility",
      value: community?.isPublic ? "Public" : "Private",
      route: "/(root)/community/community-manage/community-visibility",
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
