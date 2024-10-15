import CrossIcon from "@assets/icons/cross.svg";
import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import {
  Button,
  PrimaryTextInputControl,
  Title,
  Touchable,
} from "@universe/atoms";
import classNames from "classnames";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";

type Category = "Reps" | "Time" | "Weight" | "Distance" | "Social";

type Unit =
  | "kg"
  | "lb"
  | "m"
  | "ft"
  | "seconds"
  | "minutes"
  | "hours"
  | "mi"
  | "km";

type Metric = "Numerical" | "Duration" | "Change";

type MetricOption = "Min" | "Max" | "Target" | "Shortest" | "Longest";

type CategoryUnitsMap = Record<Category, Unit[]>;

// TODO turn into accordion like PillGroup
interface PillProps {
  onPress?: () => void;
  label: string;
  selected?: boolean;
  variant?: "indigo" | "navy" | "violet";
}

const Pill = ({ label, onPress, variant = "indigo", selected }: PillProps) => {
  return (
    <Touchable onPress={() => onPress?.()}>
      <View
        className={classNames("rounded-xl px-md py-sm bg-gray-200", {
          "bg-indigo/30": variant === "indigo" && selected,
          "bg-navy/30": variant === "navy" && selected,
          "bg-violet/30": variant === "violet" && selected,
        })}
      >
        <Text
          className={classNames("font-bold", {
            "text-gray-700": !selected,
            "text-indigo": variant === "indigo" && selected,
            "text-navy": variant === "navy" && selected,
            "text-violet": variant === "violet" && selected,
          })}
        >
          {label}
        </Text>
      </View>
    </Touchable>
  );
};

interface PillGroupProps {
  group: {
    label: string;
    options: string[];
  }[];
  onOptionPress?: (option: string) => void;
  onGroupPress?: (group: string) => void;
  groupSelected?: Metric;
  optionSelected?: MetricOption;
}
const PillGroup = ({
  group,
  onGroupPress,
  onOptionPress,
  groupSelected,
  optionSelected,
}: PillGroupProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      horizontal
      className="py-sm"
      ref={scrollViewRef}
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }}
    >
      <View className="mr-md flex flex-row gap-md">
        {group.map(({ label, options }, i) => (
          <View key={i} className="flex flex-row items-center gap-md">
            {openIndex === i && (
              <Touchable
                className="rounded-full bg-gray-200 p-xs"
                onPress={() => setOpenIndex(null)}
              >
                <CrossIcon width={18} height={18} fill={"gray"} />
              </Touchable>
            )}
            <Pill
              label={label}
              onPress={() => {
                setOpenIndex(i);
                onGroupPress?.(label);
              }}
              selected={groupSelected === label}
            />
            {openIndex === i &&
              options.map((option, j) => (
                <Pill
                  key={j}
                  label={option}
                  variant="navy"
                  selected={optionSelected === option}
                  onPress={() => onOptionPress?.(option)}
                />
              ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

interface ChallengeTypeSelectorForm {
  target: string;
  unit: string;
}

interface ChallengeTypeSelectorProps {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}
export const ChallengeTypeSelector = ({
  modalRef,
}: ChallengeTypeSelectorProps) => {
  const categories: Category[] = [
    "Reps",
    "Time",
    "Weight",
    "Distance",
    "Social",
  ];

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [metric, setMetric] = useState<Metric | undefined>(undefined);
  const [metricOption, setMetricOption] = useState<MetricOption | undefined>(
    undefined
  );
  const [unit, setUnit] = useState<Unit | undefined>(undefined);
  const [target, setTarget] = useState<string | undefined>(undefined);

  const categoryUnitsMap: CategoryUnitsMap = {
    Reps: [], // Reps typically do not have units
    Time: ["seconds", "minutes", "hours"], // Common time units (seconds, minutes, hours)
    Weight: ["kg", "lb"], // Pounds and kilograms are the most common for weight
    Distance: ["m", "km", "mi", "ft"], // Feet and meters are common for distance
    Social: [], // No units for Social
  };

  const metrics: { label: Metric; options: MetricOption[] }[] = [
    {
      label: "Numerical",
      options: ["Min", "Max", "Target"],
    },
    {
      label: "Duration",
      options: ["Shortest", "Longest"],
    },
    {
      label: "Change",
      options: ["Min", "Max", "Target"],
    },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeTypeSelectorForm>({
    defaultValues: {
      target: "",
      unit: "",
    },
  });

  return (
    <View className="flex h-full flex-col bg-white px-md">
      <View className="flex-1">
        <Title>Select a category</Title>
        <View className="mb-xl flex flex-row flex-wrap gap-md">
          {categories.map((c, i) => (
            <Pill
              onPress={() => setCategory(c)}
              label={c}
              key={i}
              selected={category === c}
            />
          ))}
        </View>

        <Title className="mb-0">Select a metric</Title>
        <View className="mb-xl flex flex-row flex-wrap gap-md">
          <PillGroup
            group={metrics}
            optionSelected={metricOption}
            groupSelected={metric}
            onGroupPress={(group) => setMetric(group as Metric)}
            onOptionPress={(option) => setMetricOption(option as MetricOption)}
          />
        </View>

        {metricOption === "Target" && (
          <View>
            <Title>Select a target</Title>
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
                      placeholder="100"
                      keyboardType="number-pad"
                      inputMode="numeric"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      autoCorrect={false}
                      autoFocus={true}
                      value={value}
                      error={!!errors.target}
                      errorMessage={errors.target?.message}
                    />
                  )}
                />
              </View>

              <View className="flex flex-row gap-md">
                {category &&
                  categoryUnitsMap[category].map((u, i) => (
                    <Pill
                      label={u}
                      key={i}
                      selected={u === unit}
                      onPress={() => setUnit(u)}
                    />
                  ))}
              </View>
            </View>
          </View>
        )}
      </View>

      <Button
        title={"Finish"}
        variant="indigo"
        className="mb-lg"
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
