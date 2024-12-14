import React from "react";
import { View } from "react-native";

import type { useCommunityInvitationsPagination_viewer$data } from "@/__generated__/useCommunityInvitationsPagination_viewer.graphql";

import { CommunityInvitationCard } from "./CommunityInvitationCard";

interface CommunityInvitationListProps {
  communityInvitationData: useCommunityInvitationsPagination_viewer$data;
}

export const CommunityInvitationList = ({
  communityInvitationData,
}: CommunityInvitationListProps) => {
  return (
    <View>
      {communityInvitationData.communityInvitations.edges &&
        communityInvitationData.communityInvitations.edges.length > 0 && (
          <View className="flex flex-col gap-md py-sm pb-md">
            {communityInvitationData.communityInvitations.edges.map((node) => (
              <CommunityInvitationCard
                key={node.cursor}
                fragmentRef={node.node}
              />
            ))}
          </View>
        )}
    </View>
  );
};
