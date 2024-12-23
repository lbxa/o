import CameraIcon from "@assets/icons/camera.svg";
import { useRouter } from "expo-router";
import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment } from "react-relay";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { UserManage_user$key } from "@/__generated__/UserManage_user.graphql";
import type { UserManageQuery } from "@/__generated__/UserManageQuery.graphql";
import { OButton } from "@/universe/atoms/OButton";
import { Ozone } from "@/universe/molecules/Ozone";

import { OText, OTouchable } from "../../../universe/atoms";
import { useLogout } from "../../mutations/useLogout";

export const USER_MANAGE_QUERY = graphql`
  query UserManageQuery {
    viewer {
      user {
        ...UserManage_user
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

interface UserManageProps {
  queryRef: PreloadedQuery<UserManageQuery>;
}

export const UserManage = ({ queryRef }: UserManageProps) => {
  const { logout, isMutationInFlight } = useLogout();

  const data = usePreloadedQuery<UserManageQuery>(USER_MANAGE_QUERY, queryRef);

  const user = useFragment<UserManage_user$key>(
    graphql`
      fragment UserManage_user on User {
        id
        firstName @required(action: THROW)
        lastName @required(action: THROW)
        handle
        email @required(action: THROW)
        bio
      }
    `,
    data.viewer?.user
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
            value={`${user?.firstName} ${user?.lastName}`}
            route="/(root)/profile/manage/user-name"
          />
          <ManageMenuItem
            label="Handle"
            value={user?.handle ?? "Create a handle"}
            route="/(root)/profile/manage/user-handle"
          />
          <ManageMenuItem
            label="Email"
            value={user?.email}
            route="/(root)/profile/manage/user-email"
          />
          <ManageMenuItem
            label="Bio"
            value={user?.bio ?? "Add a bio"}
            route="/(root)/profile/manage/user-bio"
          />
        </View>
        <OButton
          title="Logout"
          type="secondary"
          variant="red"
          loading={isMutationInFlight}
          onPress={logout}
        />
      </View>
    </Ozone>
  );
};
