import CameraIcon from "@assets/icons/camera.svg";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { ViewerProfile_viewer$key } from "@/__generated__/ViewerProfile_viewer.graphql";
import type { ViewerProfileQuery } from "@/__generated__/ViewerProfileQuery.graphql";
import { OTouchable } from "@/universe/atoms";
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
        className=""
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetchViewer} />
        }
      >
        <View className="mb-md gap-lg p-md flex grow flex-col items-center">
          <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300">
            <View className="m-auto">
              <CameraIcon width={45} height={45} fill={"grey"} />
            </View>
          </OTouchable>
          {viewer?.user && <UserProfileStats user={viewer.user} />}
          <View className="gap-sm flex flex-col items-center">
            <Text className="text-left text-3xl font-bold">
              {viewer?.user?.firstName + " " + viewer?.user?.lastName}
            </Text>
            {viewer?.user?.handle && <Text>{viewer.user.handle}</Text>}
          </View>
          {viewer?.user?.bio && <Text>{viewer.user.bio}</Text>}
        </View>
      </ScrollView>
    </Ozone>
  );
};
