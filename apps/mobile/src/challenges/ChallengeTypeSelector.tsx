import { Button, Title, Touchable } from "@universe/atoms";
import classNames from "classnames";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

// TODO turn into accordion like PillGroup
interface PillProps {
  onPress?: () => void;
  label: string;
}
const Pill = ({ label, onPress }: PillProps) => {
  return (
    <Touchable onPress={() => onPress?.()}>
      <View className="rounded-xl bg-violet/30 px-md py-sm">
        <Text className="font-bold text-navy">{label}</Text>
      </View>
    </Touchable>
  );
};

interface PillGroupProps {
  type: string;
  options: string[];
}
const PillGroup = ({ type, options }: PillGroupProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View className={classNames("flex flex-row mr-md", { "gap-md": open })}>
      <View className="rounded-xl bg-navy/30 px-md py-sm">
        <Touchable onPress={() => setOpen((prev) => !prev)}>
          <Text className="font-bold text-navy">{type}</Text>
        </Touchable>
      </View>
      <View className="flex flex-row items-center gap-md">
        {open &&
          options.map((option, i) => (
            <View className="rounded-xl bg-violet/30 px-md py-sm" key={i}>
              <Text className="font-bold text-violet">{option}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

export const ChallengeTypeSelector = () => {
  const categories = ["Reps", "Time", "Weight", "Social"];
  const metrics = [
    {
      type: "Numerical",
      options: ["Min", "Max"],
    },
    {
      type: "Duration",
      options: ["Shortest", "Longest"],
    },
  ];

  return (
    <View className="flex h-full flex-col bg-white px-md">
      <View className="flex-1">
        <Title>Select a category</Title>
        <View className="mb-lg flex flex-row gap-md">
          {categories.map((category, i) => (
            <View className="rounded-xl bg-navy/30 px-md py-sm" key={i}>
              <Text className="font-bold text-navy">{category}</Text>
            </View>
          ))}
        </View>

        <Title>and a metric</Title>
        <View className="mb-lg flex flex-row gap-md">
          <ScrollView horizontal className="pb-md">
            {metrics.map((metric, i) => (
              <PillGroup {...metric} key={i} />
            ))}
          </ScrollView>
        </View>
      </View>

      <Button
        title={"Finish"}
        variant="indigo"
        className="mb-lg"
        onPress={(e) => {
          // Read more about event pooling
          // https://legacy.reactjs.org/docs/legacy-event-pooling.html
          e.persist();
        }}
      />
    </View>
  );
};
