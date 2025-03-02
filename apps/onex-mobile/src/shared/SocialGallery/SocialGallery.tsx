import { useRouter } from "expo-router";
import { View } from "react-native";
import { useFragment } from "react-relay";
import { graphql } from "relay-runtime";

import type { SocialGallery$key } from "@/__generated__/SocialGallery.graphql";
import { OText } from "@/universe/atoms";
import { UserAvatar } from "@/users/UserAvatar";

interface SocialGalleryProps {
  fragmentRef: SocialGallery$key;
  type?: "community" | "challenge";
}

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export const SocialGallery = ({
  fragmentRef,
  type = "community",
}: SocialGalleryProps) => {
  const router = useRouter();
  const frag = useFragment<SocialGallery$key>(
    graphql`
      fragment SocialGallery on Node {
        ... on Community {
          id
          memberCount
          firstThreeMembers {
            id
            firstName
            lastName
            avatarUrl
          }
        }
        ... on Challenge {
          id
          memberCount
          firstThreeMembers {
            id
            firstName
            lastName
            avatarUrl
          }
        }
      }
    `,
    fragmentRef
  );

  const memberCount = frag.memberCount ?? 0;
  const firstThreeMembers = (frag.firstThreeMembers ?? []) as Member[];
  const firstMember = firstThreeMembers[0];
  const secondMember = firstThreeMembers[1];

  // Determine the appropriate label based on member count
  let memberLabel: string;
  if (memberCount === 0) {
    memberLabel = "No members yet";
  } else if (memberCount === 1) {
    memberLabel = "1 member";
  } else {
    memberLabel = `${memberCount} members`;
  }

  return (
    <View className="flex flex-row items-center gap-sm">
      <View className="flex-row items-center">
        {firstThreeMembers.map((member, index) => (
          <View
            key={member.id}
            className={index > 0 ? "-ml-4" : ""}
            style={{ zIndex: 30 - index * 10 }}
          >
            <UserAvatar user={member} size="sm" outline="ivory" />
          </View>
        ))}
      </View>
      <View className="flex flex-1 flex-col">
        <OText numberOfLines={1}>{memberLabel}</OText>
        {memberCount > 0 && (
          <OText numberOfLines={2} className="shrink">
            {type === "challenge" ? "Started by" : "Including"}{" "}
            {firstMember && (
              <OText
                onPress={() => router.push(`/(modals)/${firstMember.id}`)}
                className="font-bold"
              >
                {firstMember.firstName}
              </OText>
            )}
            {secondMember && (
              <OText className="font-bold">
                <OText className="font-normal">
                  {memberCount === 2 ? " and" : ","}
                </OText>{" "}
                <OText
                  onPress={() => router.push(`/(modals)/${secondMember.id}`)}
                  className="font-bold"
                >
                  {secondMember.firstName}
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
        )}
      </View>
    </View>
  );
};
