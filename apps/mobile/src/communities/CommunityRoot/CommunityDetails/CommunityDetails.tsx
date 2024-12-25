import { useRouter } from "expo-router";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityDetails_community$key } from "@/__generated__/CommunityDetails_community.graphql";
import { OButton } from "@/universe/atoms";

import { CommunitySocials } from "../../CommunitySocials";

interface CommunityDetailsProps {
  fragmentRef: CommunityDetails_community$key;
}
export const CommunityDetails = ({ fragmentRef }: CommunityDetailsProps) => {
  const router = useRouter();

  const community = useFragment(
    graphql`
      fragment CommunityDetails_community on Community {
        memberCount
      }
    `,
    fragmentRef
  );

  return (
    <View className="mb-md gap-md pt-sm flex flex-col">
      <CommunitySocials memberCount={community.memberCount ?? 0} />
      <View className="gap-md flex flex-row">
        <OButton title="Share" variant="indigo" className="rounded-xl" />
        <OButton
          title="Invite"
          variant="indigo"
          className="rounded-xl"
          onPress={() => router.push("/(root)/community/community-invite")}
        />
      </View>
    </View>
  );
};
