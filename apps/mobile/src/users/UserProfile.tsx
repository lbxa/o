import CameraIcon from "@assets/icons/camera.svg";
import { Text, View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { graphql, useFragment, usePreloadedQuery } from "react-relay";

import type { UserProfile_user$key } from "@/__generated__/UserProfile_user.graphql";
import type { UserProfileQuery } from "@/__generated__/UserProfileQuery.graphql";
import { OButton, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";

export const USER_PROFILE_QUERY = graphql`
  query UserProfileQuery($userId: ID!) {
    userProfile(id: $userId) {
      ...UserProfile_user
    }
  }
`;

interface UserProfileProps {
  queryRef: PreloadedQuery<UserProfileQuery>;
}

export const UserProfile = ({ queryRef }: UserProfileProps) => {
  const data = usePreloadedQuery<UserProfileQuery>(
    USER_PROFILE_QUERY,
    queryRef
  );

  const user = useFragment<UserProfile_user$key>(
    graphql`
      fragment UserProfile_user on User {
        id
        firstName
        lastName
        handle
        bio
      }
    `,
    data.userProfile
  );

  return (
    <Ozone>
      <View className="mx-auto flex flex-col items-center justify-center px-md pb-md">
        <OTouchable className="mb-md flex size-[200px] rounded-full bg-gray-300">
          <View className="m-auto">
            <CameraIcon width={45} height={45} fill={"grey"} />
          </View>
        </OTouchable>
        <View className="flex flex-col items-center gap-sm">
          <Text className="text-3xl font-bold">
            {user?.firstName + " " + user?.lastName}
          </Text>
          {user?.handle && <Text>{user.handle}</Text>}
          {user?.bio && <Text>{user.bio}</Text>}
        </View>
      </View>
      <View className="mt-lg px-md">
        <OButton title="Add Friend" />
      </View>
    </Ozone>
  );
};
