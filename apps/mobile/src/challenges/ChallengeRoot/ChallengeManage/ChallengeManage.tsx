import { useRouter } from "expo-router";
import { View } from "react-native";
import { graphql } from "relay-runtime";

import { OText, OTouchable } from "@/universe/atoms";
import { OButton } from "@/universe/atoms/OButton";
import { Ozone } from "@/universe/molecules/Ozone";

export const CHALLENGE_MANAGE_QUERY = graphql`
  query ChallengeManageQuery($challengeId: ID!) {
    viewer {
      challenge(challengeId: $challengeId) {
        id
        name
      }
    }
  }
`;

interface ManageMenuItemProps {
  label: string;
  value?: string;
  route: string;
}

function ManageMenuItem({ label, value, route }: ManageMenuItemProps) {
  const router = useRouter();

  return (
    <OTouchable
      onPress={() => router.push(route)}
      className="flex-row items-center justify-between border-b border-gray-200 py-sm dark:border-gray-700"
    >
      <OText className="w-3/12 text-gray-500">{label}</OText>
      {value && (
        <OText
          numberOfLines={1}
          ellipsizeMode="tail"
          className="w-9/12 text-right"
        >
          {value}
        </OText>
      )}
    </OTouchable>
  );
}

// interface ChallengeManageProps {
//   queryRef?: PreloadedQuery<ChallengeManageQuery>;
// }

export const ChallengeManage = () => {
  return (
    <Ozone>
      <View className="flex flex-col gap-md p-md">
        <View className="mb-lg flex flex-col gap-sm">
          <ManageMenuItem
            label="Title"
            value="Title"
            route="/(root)/challenges/manage/title"
          />
        </View>
        <OButton
          title="Delete Challenge"
          type="secondary"
          variant="red"
          onPress={() => {
            // TODO: Implement delete challenge functionality
          }}
        />
      </View>
    </Ozone>
  );
};
