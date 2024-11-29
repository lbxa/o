/* eslint-disable @stylistic/js/max-len */
import CrossIcon from "@assets/icons/cross.svg";
import VerifiedIcon from "@assets/icons/verified-badge.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityInvitationCard_communityInvitation$key } from "@/__generated__/CommunityInvitationCard_communityInvitation.graphql";
import { OTouchable } from "@/universe/atoms/OTouchable";

import { useZustStore } from "../../state";

interface CommunityInvitationCardProps {
  fragmentRef: CommunityInvitationCard_communityInvitation$key;
}

export const CommunityInvitationCard = ({
  fragmentRef,
}: CommunityInvitationCardProps) => {
  const router = useRouter();
  const { setSelectedCommunity } = useZustStore();
  const invitation = useFragment(
    graphql`
      fragment CommunityInvitationCard_communityInvitation on CommunityInvitation {
        id
        inviter {
          id
          firstName
          lastName
        }
        community {
          id
          name
          isVerified
        }
      }
    `,
    fragmentRef
  );

  const handleClick = () => {
    setSelectedCommunity(invitation.community);
    router.push(`/community/${invitation.community.id}`);
  };

  const handleDeny = () => {
    console.log("deny");
  };

  return (
    <OTouchable
      className="bg-indigo p-sm z-10 flex-row items-center justify-between rounded-3xl"
      onPress={handleClick}
    >
      <View className="gap-sm flex flex-1 flex-row items-center">
        <View className="border-ivory size-12 rounded-full border bg-gray-400"></View>
        <View className="flex flex-col">
          <Text className="text-ivory">
            <Text className="font-bold">{invitation.inviter.firstName}</Text>{" "}
            has invited you to join
          </Text>
          <View className="gap-sm flex flex-row items-center">
            <Text className="text-ivory text-2xl font-bold">
              {invitation.community.name}
            </Text>
            <View>
              {invitation.community.isVerified && (
                <VerifiedIcon width={18} height={18} fill="ivory" />
              )}
            </View>
          </View>
        </View>
      </View>
      <OTouchable className="z-20" onPress={handleDeny}>
        <CrossIcon width={24} height={24} fill="ivory" />
      </OTouchable>
    </OTouchable>
  );
};
