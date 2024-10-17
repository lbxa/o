import CrossIcon from "@assets/icons/cross.svg";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

import {
  Button,
  Pill,
  PrimaryTextInputControl,
  Subtitle,
  Title,
  Touchable,
} from "@/universe/atoms";

type Activity =
  | "Repetitions"
  | "Time-Based"
  | "Weightlifting"
  | "Distance"
  | "Social";

type Unit =
  | "kg"
  | "lb"
  | "m"
  | "ft"
  | "seconds"
  | "minutes"
  | "hours"
  | "mi"
  | "km"
  | "%";

type ProgressMeasurement = "Count-Based" | "Duration" | "Improvement Over Time";

type GoalTypes =
  | "Lowest Number"
  | "Highest Number"
  | "Specific Target"
  | "Shortest Time"
  | "Most Improved"
  | "Longest Time";

type ActivityUnitsMap = Record<Activity, Unit[]>;

// TODO turn into accordion like PillGroup

interface PillGroupProps {
  group: {
    label: string;
    options: string[];
  }[];
  onOptionPress?: (option: string) => void;
  onGroupPress?: (group: string) => void;
  groupSelected?: ProgressMeasurement;
  optionSelected?: GoalTypes;
}
const PillGroup = ({
  group,
  onGroupPress,
  onOptionPress,
  groupSelected,
  optionSelected,
}: PillGroupProps) => {
  const [openIndex, setOpenIndex] = useState<number | undefined>(undefined);
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      horizontal
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollTo({
          y: 0,
          x: 0,
          animated: true,
        });
      }}
    >
      <View className="flex flex-row">
        {group.map(({ label, options }, i) => (
          <View key={i} className="flex flex-row items-center">
            {openIndex === i && (
              <Touchable
                className="mr-md rounded-full bg-gray-200 p-xs"
                onPress={() => setOpenIndex(undefined)}
              >
                <CrossIcon width={18} height={18} fill={"gray"} />
              </Touchable>
            )}
            {(openIndex === i || openIndex === undefined) && (
              <Pill
                label={label}
                className="mr-md"
                onPress={() => {
                  setOpenIndex(openIndex === i ? undefined : i);
                  onGroupPress?.(label);
                }}
                selected={groupSelected === label}
              />
            )}
            {openIndex === i && (
              <View className="flex flex-row gap-md">
                {options.map((option, j) => (
                  <Pill
                    key={j}
                    label={option}
                    variant="navy"
                    selected={optionSelected === option}
                    onPress={() => onOptionPress?.(option)}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

interface ChallengeSetupForm {
  target: string;
  unit: string;
}

interface ChallengeSetupProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}
export const ChallengeSetup = ({ modalRef }: ChallengeSetupProps) => {
  const activities: Activity[] = [
    "Repetitions",
    "Time-Based",
    "Weightlifting",
    "Distance",
    "Social",
  ];

  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [progressMeasurement, setProgressMeasurement] = useState<
    ProgressMeasurement | undefined
  >(undefined);
  const [goalType, setGoalType] = useState<GoalTypes | undefined>(undefined);
  const [unit, setUnit] = useState<Unit | undefined>(undefined);
  const [target, setTarget] = useState<string | undefined>(undefined);

  const activityUnitsMap: ActivityUnitsMap = {
    Repetitions: [], // Reps typically do not have units
    "Time-Based": ["seconds", "minutes", "hours"], // Common time units (seconds, minutes, hours)
    Weightlifting: ["kg", "lb"], // Pounds and kilograms are the most common for weight
    Distance: ["m", "km", "mi", "ft"], // Feet and meters are common for distance
    Social: [], // No units for Social
  };

  const metrics: { label: ProgressMeasurement; options: GoalTypes[] }[] = [
    {
      label: "Count-Based",
      options: ["Lowest Number", "Highest Number", "Specific Target"],
    },
    {
      label: "Duration",
      options: ["Shortest Time", "Longest Time", "Specific Target"],
    },
    {
      label: "Improvement Over Time",
      options: ["Most Improved", "Specific Target"],
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeSetupForm>({
    defaultValues: {
      target: "",
      unit: "",
    },
  });

  return (
    <View className="flex h-full flex-col bg-white px-md pb-10">
      <Title>Select an activity</Title>
      <Subtitle>What type of activity is this challenge?</Subtitle>
      <View className="mb-lg flex flex-row flex-wrap gap-md">
        {activities.map((c, i) => (
          <Pill
            onPress={() => setActivity(c)}
            label={c}
            key={i}
            selected={activity === c}
          />
        ))}
      </View>

      <Title>Progress measurement</Title>
      <Subtitle>How will participants measure their progress?</Subtitle>
      <View className="mb-lg flex flex-row flex-wrap gap-md">
        <PillGroup
          group={metrics}
          optionSelected={goalType}
          groupSelected={progressMeasurement}
          onGroupPress={(group) =>
            setProgressMeasurement(group as ProgressMeasurement)
          }
          onOptionPress={(option) => setGoalType(option as GoalTypes)}
        />
      </View>

      {goalType === "Specific Target" && (
        <View className="mb-lg">
          <Title>Set a goal</Title>
          <Subtitle>
            What is the goal participants should aim to achieve?
          </Subtitle>
          <View className="flex flex-row items-center gap-md">
            <View className="flex flex-row gap-md">
              <Controller
                name="target"
                control={control}
                rules={{
                  required: { value: true, message: "Required field" },
                }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <PrimaryTextInputControl
                    className="min-w-12 max-w-20"
                    placeholder="100"
                    keyboardType="number-pad"
                    inputMode="numeric"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      setTarget(text);
                      onChange(text);
                    }}
                    autoCorrect={false}
                    autoFocus={true}
                    value={value}
                    error={!!errors.target}
                    errorMessage={errors.target?.message}
                  />
                )}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex flex-row gap-md">
                {activity &&
                  activityUnitsMap[activity].map((u) => (
                    <Pill
                      label={u}
                      key={u}
                      selected={u === unit}
                      onPress={() => setUnit(u)}
                    />
                  ))}
                {goalType === "Specific Target" &&
                  progressMeasurement === "Improvement Over Time" && (
                    <Pill
                      label={"%"}
                      key={"%"}
                      selected={"%" === unit}
                      onPress={() => setUnit("%")}
                    />
                  )}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      <Button
        title="Done"
        variant="indigo"
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
