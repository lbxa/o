/* eslint-disable @stylistic/js/max-len */
import JoinIcon from "@assets/icons/join.svg";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { graphql, useFragment } from "react-relay";

import type { CommunityInvitationCard_communityInvitation$key } from "@/__generated__/CommunityInvitationCard_communityInvitation.graphql";
import { useZustStore } from "@/state";
import { OTouchable } from "@/universe/atoms/OTouchable";

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

  return (
    <OTouchable
      className="z-10 flex-row items-center justify-between rounded-3xl bg-indigo p-sm"
      onPress={handleClick}
    >
      <View className="flex flex-1 flex-row items-center gap-sm">
        <View className="size-12 rounded-full border border-ivory bg-gray-400"></View>
        <View className="flex flex-col">
          <Text className="text-ivory">
            <Text className="font-bold">{invitation.inviter.firstName}</Text>{" "}
            has invited you to join
          </Text>
          <View className="flex flex-row items-center">
            <Text
              className="w-9/12 text-2xl font-bold text-ivory"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {invitation.community.name}
            </Text>
            {/* {invitation.community.isVerified && (
              <VerifiedIcon width={18} height={18} fill="ivory" />
            )} */}
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center gap-sm">
        <Text className="text-xl font-bold text-ivory">Visit</Text>
        <JoinIcon width={20} height={20} fill="ivory" />
      </View>
    </OTouchable>
  );
};
