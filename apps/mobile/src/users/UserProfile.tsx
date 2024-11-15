import CameraIcon from "@assets/icons/camera.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";
import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useToken } from "@/utils/useToken";

import type { UserProfileFragment$key } from "../__generated__/UserProfileFragment.graphql";

export const USER_PROFILE_FRAGMENT = graphql`
  fragment UserProfileFragment on User {
    id
    firstName
    lastName
    email
  }
`;

export const USER_PROFILE_QUERY = graphql`
  query UserProfileQuery {
    viewer {
      user {
        ...UserProfileFragment
      }
    }
  }
`;

export const UserProfile: React.FC = () => {
  const router = useRouter();
  const { deleteToken } = useToken();

  const { preloadedProfileQuery } = useZustStore();

  const data = usePreloadedQuery<UserProfileQuery>(
    USER_PROFILE_QUERY,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    preloadedProfileQuery!
  );

  const userProfile = useFragment<UserProfileFragment$key>(
    USER_PROFILE_FRAGMENT,
    data.viewer?.user
  );

  return (
    <Ozone>
      <View className="flex">
        <View className="mb-md flex grow bg-ivory p-md">
          <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300">
            <View className="m-auto">
              <CameraIcon width={45} height={45} fill={"grey"} />
            </View>
          </OTouchable>
          <Text className="text-left text-6xl font-bold">
            {userProfile?.firstName + " " + userProfile?.lastName}
          </Text>
          <Text>{userProfile?.email}</Text>
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
