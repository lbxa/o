import { useRouter } from "expo-router";
import { View } from "react-native";

import { OButton } from "@/universe/atoms";

import { CommunitySocials } from "../CommunitySocials";

// interface Props {
//   // communityRef: CommunityDetails_community$key;
// }

export const CommunityDetails = () => {
  const router = useRouter();

  // const _ = useFragment<CommunityDetails_community$key>(
  //   graphql`
  //     fragment CommunityDetails_community on Community {
  //       id
  //       name
  //     }
  //   `,
  //   communityRef
  // );

  return (
    <View className="mb-md flex flex-col gap-md pt-sm">
      <CommunitySocials />
      <View className="flex flex-row gap-md">
        <OButton title="Share" variant="indigo" className="rounded-xl" />
        <OButton
          title="Invite"
          variant="indigo"
          className="rounded-xl"
          onPress={() => router.push("/(root)/community/invite")}
        />
      </View>
    </View>
  );
};
