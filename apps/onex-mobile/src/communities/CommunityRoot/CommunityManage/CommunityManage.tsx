import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { CommunityManage_community$key } from "@/__generated__/CommunityManage_community.graphql";
import type { CommunityManageQuery } from "@/__generated__/CommunityManageQuery.graphql";
import { OImageUpload } from "@/universe/atoms";
import { OMenu } from "@/universe/molecules";
import { Ozone } from "@/universe/molecules/Ozone";
import { useCommunityImage } from "@/utils";

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

  const { uploadCommunityImage, deleteCommunityImage } = useCommunityImage();

  const community = useFragment<CommunityManage_community$key>(
    graphql`
      fragment CommunityManage_community on Community {
        id
        name
        isPublic
        imageUrl(size: LARGE)
      }
    `,
    data.viewer?.community
  );

  const menuItems = [
    {
      label: "Name",
      value: community?.name,
      route: "/(root)/community/community-manage-name",
    },
    {
      label: "Visibility",
      value: community?.isPublic ? "Public" : "Private",
      route: "/(root)/community/community-manage-visibility",
    },
  ];

  return (
    <Ozone>
      <View className="gap-md p-md flex flex-col">
        <OImageUpload
          className="mb-md"
          style="rounded"
          footerDisclaimer="Your community image is visible to all users and communities both on and off oNex."
          onUpload={async (uri) => {
            if (!community?.id) {
              throw new Error("Community ID is required");
            }
            await uploadCommunityImage(uri, community.id);
          }}
          onDelete={async () => {
            if (!community?.id) {
              throw new Error("Community ID is required");
            }
            await deleteCommunityImage(community.id);
          }}
        />
        <OMenu items={menuItems} className="mb-lg" />
      </View>
    </Ozone>
  );
};
