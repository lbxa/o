import CameraIcon from "@assets/icons/camera.svg";
import { useRouter } from "expo-router";
import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment, usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { CommunityManage_community$key } from "@/__generated__/CommunityManage_community.graphql";
import type { CommunityManageQuery } from "@/__generated__/CommunityManageQuery.graphql";
import { OText, OTouchable } from "@/universe/atoms";
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

interface ManageMenuItemProps {
  label: string;
  value?: string;
  route: string;
}

function ManageMenuItem({ label, value, route }: ManageMenuItemProps) {
  const router = useRouter();

  return (
    <OTouchable
      onPress={() => router.push(route)}
      className="flex-row items-center justify-between border-b border-gray-200 py-sm dark:border-gray-700"
    >
      <OText className="w-3/12 text-gray-500">{label}</OText>
      {value && (
        <OText
          numberOfLines={1}
          ellipsizeMode="tail"
          className="w-9/12 text-right"
        >
          {value}
        </OText>
      )}
    </OTouchable>
  );
}

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

  return (
    <Ozone>
      <View className="flex flex-col gap-md p-md">
        <OTouchable className="mx-auto mb-md flex size-[200px] rounded-full bg-gray-300 dark:bg-white/20">
          <View className="m-auto">
            <CameraIcon width={45} height={45} fill={"grey"} />
          </View>
        </OTouchable>
        <View className="mb-lg flex flex-col gap-sm">
          <ManageMenuItem
            label="Name"
            value={community?.name}
            route="/(root)/community/manage/community-name"
          />
          <ManageMenuItem
            label="Visibility"
            value={community?.isPublic ? "Public" : "Private"}
            route="/(root)/community/manage/community-visibility"
          />
        </View>
      </View>
    </Ozone>
  );
};
