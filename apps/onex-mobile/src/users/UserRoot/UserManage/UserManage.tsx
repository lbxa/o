import { View } from "react-native";
import type { PreloadedQuery } from "react-relay";
import { useFragment } from "react-relay";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";

import type { UserManage_user$key } from "@/__generated__/UserManage_user.graphql";
import type { UserManageQuery } from "@/__generated__/UserManageQuery.graphql";
import { OImageUpload } from "@/universe/atoms";
import { OButton } from "@/universe/atoms/OButton";
import { OMenu } from "@/universe/molecules";
import { Ozone } from "@/universe/molecules/Ozone";
import { useAvatarImage } from "@/utils";

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

interface UserManageProps {
  queryRef: PreloadedQuery<UserManageQuery>;
}

export const UserManage = ({ queryRef }: UserManageProps) => {
  const { logout, isMutationInFlight } = useLogout();

  const data = usePreloadedQuery<UserManageQuery>(USER_MANAGE_QUERY, queryRef);
  const { uploadAvatarImage, deleteAvatarImage } = useAvatarImage();

  const user = useFragment<UserManage_user$key>(
    graphql`
      fragment UserManage_user on User {
        id
        firstName
        lastName
        handle
        email
        bio
      }
    `,
    data.viewer?.user
  );

  const menuItems = [
    {
      label: "Name",
      value:
        Boolean(user?.firstName) && Boolean(user?.lastName)
          ? `${user?.firstName} ${user?.lastName}`
          : "Add a name",
      route: "/profile/profile-manage-name",
    },
    {
      label: "Handle",
      value: user?.handle ?? "Create a handle",
      route: "/profile/profile-manage-handle",
    },
    {
      label: "Email",
      value: user?.email ?? "Add an email",
      route: "/profile/profile-manage-email",
    },
    {
      label: "Bio",
      value: user?.bio ?? "Add a bio",
      route: "/profile/profile-manage-bio",
    },
  ];

  return (
    <Ozone>
      <View className="flex flex-col gap-md p-md">
        <OImageUpload
          className="mb-md"
          footerDisclaimer="Your profile picture is visible to all users and communities both on and off oNex."
          onUpload={async (uri) => {
            await uploadAvatarImage(uri);
          }}
          onDelete={async () => {
            await deleteAvatarImage();
          }}
        />
        <OMenu items={menuItems} className="mb-lg" />
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
