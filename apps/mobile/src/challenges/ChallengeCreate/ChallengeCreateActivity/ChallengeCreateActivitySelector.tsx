import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ChallengeActivityUnits } from "@o/api-gql";
import { ChallengeActivityGoal } from "@o/api-gql";
import { ChallengeActivityType } from "@o/api-gql";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";

import { useZustStore } from "@/state";
import {
  OButton,
  Pill,
  PrimaryTextInputControl,
  Subtitle,
  Title,
} from "@/universe/atoms";

import {
  challengeActivityGoalToLabel,
  ChallengeActivityTypeToGoalMap,
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
  const { setChallengeFormField, clearChallengeForm } = useZustStore();

  const challengeForm = useZustStore((state) => state.challengeForm);

  const selectedActivity = challengeForm.type;
  const selectedGoal = challengeForm.goal;
  const selectedUnit = challengeForm.unit;

  const activities = Object.values(ChallengeActivityType);

  const goals = [...ChallengeActivityTypeToGoalMap].reduce(
    (acc, [activity, goals]) => {
      acc[activity] = goals;
      return acc;
    },
    {} as Record<ChallengeActivityType, ChallengeActivityGoal[]>
  );

  const allowedGoals = selectedActivity ? goals[selectedActivity] : [];

  const hasSpecificTargetGoal = selectedGoal
    ? allowedGoals.find(
        (goal) =>
          goal.includes(ChallengeActivityGoal.SpecificTarget) &&
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

  const isFinished =
    (selectedActivity && selectedGoal) ??
    selectedActivity === ChallengeActivityType.Social;

  const onSubmit = (data: ChallengeActivityForm) => {
    if (data.target) {
      setChallengeFormField("target", Number(data.target));
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChallengeActivityForm>({
    defaultValues: {
      target: "",
    },
  });

  return (
    <View className="px-md flex h-full flex-col pb-10">
      <Title>Select an activity</Title>
      <Subtitle>What type of activity is this challenge?</Subtitle>
      <View className="mb-lg gap-md flex flex-row flex-wrap">
        {activities.map((c) => (
          <Pill
            key={c}
            onPress={() => {
              clearChallengeForm();
              setChallengeFormField("type", c);
            }}
            label={challengeActivityTypeToLabel(c)}
            selected={selectedActivity === c}
          />
        ))}
      </View>

      {allowedGoals.length > 0 && (
        <View>
          <Title>Select a goal</Title>
          <Subtitle>How will participants measure their progress?</Subtitle>
          <View className="mb-lg gap-md flex flex-row flex-wrap">
            {allowedGoals.map((c) => (
              <Pill
                key={c}
                onPress={() => setChallengeFormField("goal", c)}
                label={challengeActivityGoalToLabel(c)}
                selected={selectedGoal === c}
              />
            ))}
          </View>
        </View>
      )}

      {hasSpecificTargetGoal && (
        <View className="mb-lg">
          <Title>Set a target</Title>
          <Subtitle>
            What is the target participants should aim to achieve?
          </Subtitle>
          <View className="gap-md flex flex-row items-center">
            <View className="gap-md flex flex-row">
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
                    bottomSheet
                    keyboardType="number-pad"
                    inputMode="numeric"
                    returnKeyType="done"
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="gap-md flex flex-row">
                {selectedActivity &&
                  units[selectedActivity].map((u) => (
                    <Pill
                      label={challengeActivityUnitToLabel(u)}
                      key={u}
                      selected={u === selectedUnit}
                      onPress={() => setChallengeFormField("unit", u)}
                    />
                  ))}
                {selectedGoal &&
                  [
                    ChallengeActivityGoal.MostImproved,
                    ChallengeActivityGoal.SpecificTarget,
                  ].includes(selectedGoal) && (
                    <Pill
                      label={challengeActivityUnitToLabel(
                        ChallengeActivityUnits.Percent
                      )}
                      key={ChallengeActivityUnits.Percent}
                      selected={selectedUnit === ChallengeActivityUnits.Percent}
                      onPress={() =>
                        setChallengeFormField(
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

      <OButton
        title="Done"
        variant="indigo"
        disabled={!isFinished}
        onPress={async (e) => {
          // Read more about event pooling
          // https://legacy.reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          await handleSubmit(onSubmit)();
          modalRef.current?.close();
        }}
      />
    </View>
  );
};
