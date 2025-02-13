import { useRouter } from "expo-router";
import { View } from "react-native";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { CommunitySocials_community$key } from "@/__generated__/CommunitySocials_community.graphql";
import { OText } from "@/universe/atoms/OText";
import { AvatarArray } from "@/universe/molecules/AvatarArray";

interface CommunitySocialsProps {
  fragmentRef: CommunitySocials_community$key;
}

export const CommunitySocials = ({ fragmentRef }: CommunitySocialsProps) => {
  const router = useRouter();
  const frag = useFragment(
    graphql`
      fragment CommunitySocials_community on Community {
        id
        memberCount
        firstMember {
          id
          firstName
        }
        secondMember {
          id
          firstName
        }
      }
    `,
    fragmentRef
  );

  const memberCount = frag.memberCount ?? 0;
  const firstMemberName = frag.firstMember?.firstName;
  const secondMemberName = frag.secondMember?.firstName;

  const memberCountLabel = memberCount === 1 ? "member" : "members";

  return (
    <View className="flex flex-row items-center gap-sm">
      <AvatarArray arrayCount={memberCount} />
      <View className="flex flex-1 flex-col">
        <OText numberOfLines={1}>
          {memberCount} {memberCountLabel}
        </OText>
        <OText numberOfLines={2} className="shrink">
          Including{" "}
          <OText
            onPress={() => router.push(`/(modals)/${frag.firstMember?.id}`)}
            className="font-bold"
          >
            {firstMemberName}
          </OText>
          {secondMemberName && (
            <OText className="font-bold">
              <OText className="font-normal">
                {memberCount === 2 ? " and" : ","}
              </OText>{" "}
              <OText
                onPress={() =>
                  router.push(`/(modals)/${frag.secondMember?.id}`)
                }
                className="font-bold"
              >
                {secondMemberName}
              </OText>
            </OText>
          )}
          {memberCount > 2 && (
            <OText className="font-bold">
              <OText className="font-normal"> and </OText>
              {memberCount - 2} others
            </OText>
          )}
        </OText>
      </View>
    </View>
  );
};
