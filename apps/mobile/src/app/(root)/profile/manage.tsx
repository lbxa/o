import { View } from "react-native";

import { OButton } from "@/universe/atoms";
import { Ozone } from "@/universe/molecules";
import { useLogout } from "@/users/mutations";

export default function CommunityManageRoute() {
  const { logout, isMutationInFlight } = useLogout();
  return (
    <Ozone>
      <View className="flex-1 px-md">
        <OButton
          title="Logout"
          type="primary"
          variant="red"
          loading={isMutationInFlight}
          onPress={logout}
        />
      </View>
    </Ozone>
  );
}
