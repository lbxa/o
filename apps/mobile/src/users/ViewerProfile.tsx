import CameraIcon from "@assets/icons/camera.svg";
import { useRouter } from "expo-router";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import {
  graphql,
  useFragment,
  useMutation,
  usePreloadedQuery,
} from "react-relay";

import type { ViewerProfile_viewer$key } from "@/__generated__/ViewerProfile_viewer.graphql";
import type { ViewerProfileLogoutMutation } from "@/__generated__/ViewerProfileLogoutMutation.graphql";
import type { ViewerProfileQuery } from "@/__generated__/ViewerProfileQuery.graphql";
import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useToken } from "@/utils";

import { useNoSuspenseRefetch } from "../relay";
import { APP_ROOT_QUERY } from "../root";

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
  const router = useRouter();
  const { deleteTokens } = useToken();
  const { removeActiveUser } = useZustStore();

  const [commitMutation, isMutationInFlight] =
    useMutation<ViewerProfileLogoutMutation>(graphql`
      mutation ViewerProfileLogoutMutation {
        authLogout
      }
    `);

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
        <View className="flex">
          <View className="mb-md flex grow flex-col items-center gap-sm bg-ivory p-md">
            <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300">
              <View className="m-auto">
                <CameraIcon width={45} height={45} fill={"grey"} />
              </View>
            </OTouchable>
            <Text className="text-left text-3xl font-bold">
              {viewer?.user?.firstName + " " + viewer?.user?.lastName}
            </Text>
            {viewer?.user?.handle && <Text>{viewer.user.handle}</Text>}
            {viewer?.user?.bio && (
              <Text className="mt-md">{viewer.user.bio}</Text>
            )}
          </View>
          <View className="mx-md">
            <OButton
              title="Logout"
              loading={isMutationInFlight}
              onPress={async () => {
                await deleteTokens();
                removeActiveUser();
                commitMutation({
                  variables: {},
                  updater: (proxyStore) => {
                    proxyStore.invalidateStore();
                  },
                });
                router.replace("/auth/login");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </Ozone>
  );
};
