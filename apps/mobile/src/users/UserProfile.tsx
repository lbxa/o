import CameraIcon from "@assets/icons/camera.svg";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { graphql, usePreloadedQuery } from "react-relay";

import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";
import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useToken } from "@/utils/useToken";

export const USER_PROFILE_QUERY = graphql`
  query UserProfileQuery {
    viewer {
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const UserProfile: React.FC = () => {
  const router = useRouter();
  const { deleteToken } = useToken();

  const { preloadedProfileQuery } = useZustStore();

  useEffect(() => {
    if (!preloadedProfileQuery) {
      // Handle the case where preloadedProfileQuery is not available
      console.error("Preloaded profile query is not available.");
      // Optionally, navigate to an error page or show a message
      return;
    }
    return () => preloadedProfileQuery.dispose();
  }, [preloadedProfileQuery]);

  const data = usePreloadedQuery<UserProfileQuery>(
    USER_PROFILE_QUERY,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    preloadedProfileQuery!
  );

  return (
    <Ozone>
      <View className="flex">
        <View className="mb-md bg-ivory p-md flex grow">
          <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300">
            <View className="m-auto">
              <CameraIcon width={45} height={45} fill={"grey"} />
            </View>
          </OTouchable>
          <Text className="text-left text-6xl font-bold">
            {data.viewer?.user?.firstName + " " + data.viewer?.user?.lastName}
          </Text>
          <Text>{data.viewer?.user?.email}</Text>
        </View>
        <View className="mx-md">
          <OButton
            title="Logout"
            onPress={async () => {
              await deleteToken();
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </View>
    </Ozone>
  );
};
