import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ChallengeActivityUnits } from "@o/api";
import { ChallengeActivityGoal, ChallengeActivityMeasurement } from "@o/api";
import { ChallengeActivityType } from "@o/api";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

import { useZustStore } from "@/state";
import {
  Button,
  Pill,
  PrimaryTextInputControl,
  Subtitle,
  Title,
} from "@/universe/atoms";
import { PillGroup } from "@/universe/molecules";

import type {
  ChallengeActivityGoalLabel,
  ChallengeActivityMeasurementLabel,
} from "../../ChallengeActivity/domain";
import {
  challengeActivityGoalLabelToEnum,
  challengeActivityGoalToLabel,
  challengeActivityMeasurementLabelToEnum,
  ChallengeActivityMeasurementToGoalMap,
  challengeActivityMeasurementToLabel,
  ChallengeActivityToMeasurementMap,
  challengeActivityTypeToLabel,
  ChallengeActivityTypeToUnitsMap,
  challengeActivityUnitToLabel,
} from "../../ChallengeActivity/domain";

interface ChallengeActivityForm {
  target: string;
}

interface Props {
  modalRef: React.RefObject<BottomSheetModalMethods>;
}
export const ChallengeCreateActivitySelector = ({ modalRef }: Props) => {
  const { setChallengeFormActivityField } = useZustStore();

  const challengeForm = useZustStore((state) => state.challengeForm);

  const selectedActivity = challengeForm.activity?.type;
  const selectedMeasurement = challengeForm.activity?.measurement;
  const selectedGoal = challengeForm.activity?.goal;
  const selectedUnit = challengeForm.activity?.unit;

  const activities = Object.values(ChallengeActivityType);

  const measurements = [...ChallengeActivityToMeasurementMap].reduce(
    (acc, [activity, measurements]) => {
      acc[activity] = measurements;
      return acc;
    },
    {} as Record<ChallengeActivityType, ChallengeActivityMeasurement[]>
  );

  const allowedMeasurements = selectedActivity
    ? measurements[selectedActivity]
    : [];

  const allowedMeasurementGoals = allowedMeasurements.map(
    (allowedMeasurement) => ({
      measurement: allowedMeasurement,
      goals: ChallengeActivityMeasurementToGoalMap.get(allowedMeasurement),
    })
  );

  const hasSpecificTargetGoal = selectedMeasurement
    ? allowedMeasurementGoals.find(
        (goal) =>
          goal.goals?.includes(ChallengeActivityGoal.SpecificTarget) &&
          selectedGoal === ChallengeActivityGoal.SpecificTarget
      )
    : false;

  const units = [...ChallengeActivityTypeToUnitsMap].reduce(
    (acc, [activity, units]) => {
      acc[activity] = units;
      return acc;
    },
    {} as Record<ChallengeActivityType, ChallengeActivityUnits[]>
  );

  const onSubmit = (data: ChallengeActivityForm) => {
    setChallengeFormActivityField("target", Number(data.target));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeActivityForm>({
    defaultValues: {
      target: challengeForm.activity?.target?.toString() ?? "",
    },
  });

  return (
    <View className="flex h-full flex-col bg-white px-md pb-10">
      <Title>Select an activity</Title>
      <Subtitle>What type of activity is this challenge?</Subtitle>
      <View className="mb-lg flex flex-row flex-wrap gap-md">
        {activities.map((c) => (
          <Pill
            key={c}
            onPress={() => setChallengeFormActivityField("type", c)}
            label={challengeActivityTypeToLabel(c)}
            selected={selectedActivity === c}
          />
        ))}
      </View>

      {allowedMeasurements.length > 0 && (
        <View>
          <Title>Select a measurement</Title>
          <Subtitle>How will participants measure their progress?</Subtitle>
          <View className="mb-lg flex flex-row flex-wrap gap-md">
            <PillGroup
              group={allowedMeasurementGoals.map(({ measurement, goals }) => ({
                label: challengeActivityMeasurementToLabel(
                  measurement
                ) as string,
                options: goals?.map(challengeActivityGoalToLabel) ?? [],
              }))}
              optionSelected={
                selectedGoal
                  ? challengeActivityGoalToLabel(selectedGoal)
                  : undefined
              }
              onOptionPress={(option) =>
                setChallengeFormActivityField(
                  "goal",
                  challengeActivityGoalLabelToEnum(
                    option as ChallengeActivityGoalLabel
                  )
                )
              }
              groupSelected={
                selectedMeasurement
                  ? challengeActivityMeasurementToLabel(selectedMeasurement)
                  : undefined
              }
              onGroupPress={(group) =>
                setChallengeFormActivityField(
                  "measurement",
                  challengeActivityMeasurementLabelToEnum(
                    group as ChallengeActivityMeasurementLabel
                  )
                )
              }
            />
          </View>
        </View>
      )}

      {hasSpecificTargetGoal && (
        <View className="mb-lg">
          <Title>Set a target</Title>
          <Subtitle>
            What is the target participants should aim to achieve?
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
                      // setChallengeFormActivityField("target", Number(text));
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
                {selectedActivity &&
                  units[selectedActivity].map((u) => (
                    <Pill
                      label={challengeActivityUnitToLabel(u)}
                      key={u}
                      selected={u === selectedUnit}
                      onPress={() => setChallengeFormActivityField("unit", u)}
                    />
                  ))}
                {selectedMeasurement ===
                  ChallengeActivityMeasurement.Improvement && (
                  <Pill
                    label={challengeActivityUnitToLabel(
                      ChallengeActivityUnits.Percent
                    )}
                    key={ChallengeActivityUnits.Percent}
                    selected={selectedUnit === ChallengeActivityUnits.Percent}
                    onPress={() =>
                      setChallengeFormActivityField(
                        "unit",
                        ChallengeActivityUnits.Percent
                      )
                    }
                  />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      {selectedActivity && selectedMeasurement && selectedGoal && (
        <Button
          title="Done"
          variant="indigo"
          onPress={async (e) => {
            // Read more about event pooling
            // https://legacy.reactjs.org/docs/legacy-event-pooling.html
            e.persist();
            await handleSubmit(onSubmit)();
            modalRef.current?.close();
          }}
        />
      )}
    </View>
  );
};
