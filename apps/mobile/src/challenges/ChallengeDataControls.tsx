import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import CheckBox from "expo-checkbox";
import { Text, View } from "react-native";

import { Button, Subtitle, Title } from "@/universe/atoms";

export const ChallengeDataControls: React.FC<{
  modalRef: React.RefObject<BottomSheetModalMethods>;
}> = ({ modalRef }) => {
  return (
    <View className="flex h-full flex-col bg-white px-md">
      <View className="flex flex-1">
        <Title>Proof of Workout</Title>
        <Subtitle>
          How will you users prove they completed your challenge?
        </Subtitle>
        <View className="flex flex-col gap-md">
          <View className="flex flex-row items-center gap-md">
            <View className="flex flex-1">
              <Text className="mb-sm text-xl">Blind Trust</Text>
              <Text>
                Users can submit their workouts without any verification. This
                is a good option for challenges that are self-paced and do not
                require any external verification.
              </Text>
            </View>
            <CheckBox value={true} color="black" />
          </View>
          <View className="flex flex-row items-center gap-md">
            <View className="flex flex-1">
              <Text className="mb-sm text-xl">Buddy System</Text>
              <Text>
                Users can verify each other's workouts. This is a good option
                for communities that want to maintain a high level of trust and
                accountability.
              </Text>
            </View>
            <CheckBox value={false} color="black" />
          </View>
          <View className="flex flex-row items-center gap-md">
            <View className="flex flex-1">
              <Text className="mb-sm text-xl">Verified admin only</Text>
              <Text>
                Only admins can verify your proof of workout. This is a good
                option for challenges that are self-paced and do not require any
                external verification.
              </Text>
            </View>
            <CheckBox value={false} color="black" />
          </View>
        </View>
      </View>
      <Button
        title={"Done"}
        variant="indigo"
        className="mb-10"
        onPress={(e) => {
          // Read more about event pooling
          // https://legacy.reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          modalRef.current?.close();
        }}
      />
    </View>
  );
};
