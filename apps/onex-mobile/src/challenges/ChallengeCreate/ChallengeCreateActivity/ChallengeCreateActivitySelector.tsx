import type { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import type { ChallengeActivityUnits } from "@o/api-gql";
import { ChallengeActivityGoal } from "@o/api-gql";
import { ChallengeActivityType } from "@o/api-gql";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

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

  const goals = useMemo(
    () =>
      [...ChallengeActivityTypeToGoalMap].reduce(
        (acc, [activity, goals]) => {
          acc[activity] = goals;
          return acc;
        },
        {} as Record<ChallengeActivityType, ChallengeActivityGoal[]>
      ),
    []
  );

  const allowedGoals = useMemo(
    () => (selectedActivity ? goals[selectedActivity] : []),
    [selectedActivity, goals]
  );

  const hasSpecificTargetGoal = useMemo(
    () =>
      selectedGoal
        ? allowedGoals.find(
            (goal) =>
              goal.includes(ChallengeActivityGoal.SpecificTarget) &&
              selectedGoal === ChallengeActivityGoal.SpecificTarget
          )
        : false,
    [selectedGoal, allowedGoals]
  );

  const unitsByActivity = useMemo(
    () =>
      [...ChallengeActivityTypeToUnitsMap].reduce(
        (acc, [activity, units]) => {
          acc[activity] = units;
          return acc;
        },
        {} as Record<ChallengeActivityType, ChallengeActivityUnits[]>
      ),
    []
  );

  const activitiesWithoutUnits = useMemo(
    () =>
      Object.entries(unitsByActivity)
        .filter(([_, units]) => units.length === 0)
        .map(([activity]) => activity),
    [unitsByActivity]
  );

  const isFinished = useMemo(
    () =>
      (selectedActivity && selectedGoal && selectedUnit) ??
      activitiesWithoutUnits.find(
        (activity) => activity === selectedActivity?.valueOf()
      ) ??
      selectedActivity === ChallengeActivityType.Social,
    [selectedActivity, selectedGoal, selectedUnit, activitiesWithoutUnits]
  );

  const isDistance = useMemo(
    () => selectedActivity === ChallengeActivityType.Distance,
    [selectedActivity]
  );

  const onSubmit = (data: ChallengeActivityForm) => {
    if (data.target) {
      setChallengeFormField("target", Number(data.target));
    }
    modalRef.current?.close();
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
    <View className="flex h-full flex-col px-md pb-10">
      <Title>Select an activity</Title>
      <Subtitle>
        An activity is a trackable event that participants can complete
      </Subtitle>
      <View className="mb-lg flex flex-row flex-wrap gap-md">
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
          <Subtitle>
            The goal should be a measure of progress for the challenge
          </Subtitle>
          <View className="mb-lg flex flex-row flex-wrap gap-md">
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

      {selectedActivity &&
        selectedGoal &&
        unitsByActivity[selectedActivity].length > 0 && (
          <View className="mb-lg">
            <Title>Select a unit</Title>
            <Subtitle>
              A common unit can help convert from different inputs
            </Subtitle>
            <View className="flex flex-row items-center gap-md">
              <View className="flex flex-row gap-md">
                {unitsByActivity[selectedActivity].map((u) => (
                  <Pill
                    label={challengeActivityUnitToLabel(u)}
                    key={u}
                    selected={u === selectedUnit}
                    onPress={() => setChallengeFormField("unit", u)}
                  />
                ))}
                {/* TODO Add back in when we we figure out what exactly we want to do with this */}
                {/* {selectedGoal === ChallengeActivityGoal.SpecificTarget && (
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
                )} */}
              </View>
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
                  required: { value: true, message: "Required" },
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
          </View>
        </View>
      )}

      <OButton
        title={isDistance ? "Coming soon" : "Done"}
        variant="indigo"
        disabled={!isFinished || isDistance}
        onPress={async (e) => {
          // Read more about event pooling
          // https://legacy.reactjs.org/docs/legacy-event-pooling.html
          e.persist();
          await handleSubmit(onSubmit)();
        }}
      />
    </View>
  );
};
