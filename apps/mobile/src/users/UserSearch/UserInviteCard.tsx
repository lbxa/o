import PaperPlaneIcon from "@assets/icons/paper-plane.svg";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { graphql, useFragment, useMutation } from "react-relay";

import { useZustStore } from "@/state";
import { Touchable } from "@/universe/atoms";

import type { UserFragment$key } from "../../__generated__/UserFragment.graphql";
import type { UserInviteCardMutation } from "../../__generated__/UserInviteCardMutation.graphql";
import { USER_FRAGMENT } from "../UserFragment";

const USER_COMMUNITY_INVITE_MUTATION = graphql`
  mutation UserInviteCardMutation($userId: ID!, $communityId: ID!) {
    communityInvite(userId: $userId, communityId: $communityId)
  }
`;

interface UserInviteCardProps {
  userFragment: UserFragment$key;
}

export const UserInviteCard = ({ userFragment }: UserInviteCardProps) => {
  const [commitMutation, mutationInFlight] =
    useMutation<UserInviteCardMutation>(USER_COMMUNITY_INVITE_MUTATION);
  const user = useFragment(USER_FRAGMENT, userFragment);
  const { selectedCommunity } = useZustStore();

  if (!selectedCommunity) {
    throw new Error("ERR: no active community");
    // TODO what kind of error should we throw here?
  }

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = useCallback(() => {
    commitMutation({
      variables: {
        userId: user.id,
        communityId: selectedCommunity.id,
      },
      onCompleted: (response) => {
        setSuccess(true);
        setError(false);
      },
      onError: (error) => {
        setError(true);
        setSuccess(false);
      },
    });
  }, [commitMutation, selectedCommunity.id, user.id]);

  return (
    <View className="mb-lg px-md flex w-full flex-row items-center">
      <View className="flex flex-1 flex-col">
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        <Text>{user.handle}</Text>
      </View>
      <Touchable onPress={onSubmit} disabled={mutationInFlight || !!success}>
        {mutationInFlight ? (
          <Text>Sending...</Text>
        ) : (
          <PaperPlaneIcon fill={success ? "#cccccc" : "#5955eb"} />
        )}
      </Touchable>
    </View>
  );
};
