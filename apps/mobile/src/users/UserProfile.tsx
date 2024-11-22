import CameraIcon from "@assets/icons/camera.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import { useZustStore } from "@/state";
import { OButton, OTouchable } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useToken } from "@/utils";

export const USER_PROFILE_QUERY = graphql`
  query UserProfileQuery {
    viewer {
      ...UserProfile_viewer
    }
  }
`;

export const UserProfile: React.FC = () => {
  const router = useRouter();
  const { deleteTokens } = useToken();
  const { activeUser, removeActiveUser } = useZustStore();

  const _ = useFragment(
    graphql`
      fragment UserProfile_viewer on Viewer {
        user {
          id
          firstName
          lastName
          email
        }
      }
    `,
    null
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
            {activeUser?.firstName + " " + activeUser?.lastName}
          </Text>
          <Text>{activeUser?.email}</Text>
        </View>
        <View className="mx-md">
          <OButton
            title="Logout"
            onPress={async () => {
              await deleteTokens();
              removeActiveUser();
              router.replace("/(auth)/login");
            }}
          />
        </View>
      </View>
    </Ozone>
  );
};
