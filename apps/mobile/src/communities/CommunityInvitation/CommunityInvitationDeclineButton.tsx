import CrossIcon from "@assets/icons/cross.svg";
import { Text } from "react-native";

import { OTouchable } from "@/universe/atoms";

interface CommunityInvitationDeclineButtonProps {
  onDecline: () => void;
}
export const CommunityInvitationDeclineButton = ({
  onDecline,
}: CommunityInvitationDeclineButtonProps) => {
  return (
    <OTouchable className="z-20 flex flex-row items-center" onPress={onDecline}>
      <Text className="font-bold text-ivory">Decline</Text>
      <CrossIcon width={20} height={20} fill="ivory" />
    </OTouchable>
  );
};
