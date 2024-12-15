import CameraIcon from "@assets/icons/camera.svg";
import { RefreshControl, ScrollView, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { ViewerProfile_viewer$key } from "@/__generated__/ViewerProfile_viewer.graphql";
import type { ViewerProfileQuery } from "@/__generated__/ViewerProfileQuery.graphql";
import { OText, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

import { useNoSuspenseRefetch } from "../relay";
import { APP_ROOT_QUERY } from "../root";
import { UserProfileStats } from "./UserProfileStats";

export const VIEWER_PROFILE_QUERY = graphql`
  query ViewerProfileQuery {
    viewer {
      ...ViewerProfile_viewer
    }
  }
`;

interface ViewerProfileProps {
  queryRef: PreloadedQuery<ViewerProfileQuery>;
}

export const ViewerProfile = ({ queryRef }: ViewerProfileProps) => {
  const viewerProfileQuery = usePreloadedQuery<ViewerProfileQuery>(
    VIEWER_PROFILE_QUERY,
    queryRef
  );

  const viewer = useFragment<ViewerProfile_viewer$key>(
    graphql`
      fragment ViewerProfile_viewer on Viewer {
        user {
          id
          firstName
          lastName
          handle
          bio
          ...UserProfileStats_user
        }
      }
    `,
    viewerProfileQuery.viewer
  );

  const { refetch: refetchViewer, isRefetching } = useNoSuspenseRefetch({
    ancestorQuery: APP_ROOT_QUERY,
    ancestorVariables: {},
  });

  return (
    <Ozone>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetchViewer} />
        }
      >
        <View className="mb-md flex grow flex-col items-center gap-lg p-md">
          <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300 dark:bg-white/20">
            <View className="m-auto">
              <CameraIcon width={45} height={45} fill={"grey"} />
            </View>
          </OTouchable>
          {viewer?.user && <UserProfileStats user={viewer.user} />}
          <View className="flex flex-col items-center gap-sm">
            <OText className="text-3xl font-bold">
              {viewer?.user?.firstName} {viewer?.user?.lastName}
            </OText>
            {viewer?.user?.handle && (
              <OText className="text-lg">{viewer.user.handle}</OText>
            )}
          </View>
          {viewer?.user?.bio && (
            <OText className="text-lg">{viewer.user.bio}</OText>
          )}
        </View>
      </ScrollView>
    </Ozone>
  );
};
