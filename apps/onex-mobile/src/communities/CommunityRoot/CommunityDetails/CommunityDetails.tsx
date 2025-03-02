import { useRouter } from "expo-router";
import { View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityDetails_community$key } from "@/__generated__/CommunityDetails_community.graphql";
import { SocialGallery } from "@/shared";
import { OButton } from "@/universe/atoms";

interface CommunityDetailsProps {
  fragmentRef: CommunityDetails_community$key;
}
export const CommunityDetails = ({ fragmentRef }: CommunityDetailsProps) => {
  const router = useRouter();

  const community = useFragment(
    graphql`
      fragment CommunityDetails_community on Community {
        ...SocialGallery
      }
    `,
    fragmentRef
  );

  return (
    <View className="mb-md flex flex-col gap-md pt-sm">
      <SocialGallery fragmentRef={community} type="community" />
      <View className="flex flex-row gap-md">
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
