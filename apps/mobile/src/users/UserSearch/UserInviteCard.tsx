import PaperPlaneIcon from "@assets/icons/paper-plane.svg";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { graphql, useFragment, useMutation } from "react-relay";

import type { UserInviteCard_user$key } from "@/__generated__/UserInviteCard_user.graphql";
import type { UserInviteCardMutation } from "@/__generated__/UserInviteCardMutation.graphql";
import { useZustStore } from "@/state";
import { OTouchable } from "@/universe/atoms";

interface UserInviteCardProps {
  fragmentRef: UserInviteCard_user$key;
}

export const UserInviteCard = ({ fragmentRef }: UserInviteCardProps) => {
  const { selectedCommunity } = useZustStore();
  const [commitMutation, mutationInFlight] =
    useMutation<UserInviteCardMutation>(graphql`
      mutation UserInviteCardMutation($userId: ID!, $communityId: ID!) {
        communityInvite(userId: $userId, communityId: $communityId)
      }
    `);

  const user = useFragment<UserInviteCard_user$key>(
    graphql`
      fragment UserInviteCard_user on User {
        id
        firstName
        lastName
        handle
      }
    `,
    fragmentRef
  );

  if (!selectedCommunity) {
    throw new Error("ERR: no active community");
    // TODO what kind of error should we throw here?
  }

  const [success, setSuccess] = useState(false);
  const [_, setError] = useState(false);

  const onSubmit = useCallback(() => {
    commitMutation({
      variables: {
        userId: user.id,
        communityId: selectedCommunity.id,
      },
      onCompleted: () => {
        setSuccess(true);
        setError(false);
      },
      onError: (error) => {
        console.error("Error inviting user to community", error);
        setError(true);
        setSuccess(false);
      },
    });
  }, [commitMutation, selectedCommunity.id, user.id]);

  return (
    <View className="mb-sm flex min-h-12 w-full flex-row items-center">
      <View className="flex flex-1 flex-col">
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        {user.handle && <Text>{user.handle}</Text>}
      </View>
      <OTouchable onPress={onSubmit} disabled={mutationInFlight || !!success}>
        {mutationInFlight ? (
          <ActivityIndicator />
        ) : (
          <PaperPlaneIcon fill={success ? "#cccccc" : "#5955eb"} />
        )}
      </OTouchable>
    </View>
  );
};
