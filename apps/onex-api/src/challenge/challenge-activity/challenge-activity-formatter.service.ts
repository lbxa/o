import { Injectable } from "@nestjs/common";
import { intToTimestamp } from "@o/utils";

import { ChallengeActivityGoal, ChallengeActivityUnits } from "@/types/graphql";

@Injectable()
export class ChallengeActivityFormatterService {
  public readonly unitFormatters = new Map<
    ChallengeActivityUnits,
    (result: number) => string
  >([
    [ChallengeActivityUnits.KILOGRAMS, (result) => `${result} kg`],
    [ChallengeActivityUnits.POUNDS, (result) => `${result} lb`],
    [ChallengeActivityUnits.METRES, (result) => `${result} m`],
    [ChallengeActivityUnits.KILOMETRES, (result) => `${result} km`],
    [ChallengeActivityUnits.MILES, (result) => `${result} mi`],
    [ChallengeActivityUnits.FEET, (result) => `${result} ft`],
    [ChallengeActivityUnits.PERCENT, (result) => `${result}%`],
    [
      ChallengeActivityUnits.SECONDS,
      (result) => intToTimestamp(result).toString(),
    ],
    [
      ChallengeActivityUnits.MINUTES,
      (result) => intToTimestamp(result).toString(),
    ],
    [
      ChallengeActivityUnits.HOURS,
      (result) => intToTimestamp(result).toString(),
    ],
  ]);

  public readonly goalFormatStrategies = new Map<
    ChallengeActivityGoal,
    (result: number, unit: ChallengeActivityUnits) => string
  >([
    [
      ChallengeActivityGoal.HIGHEST_NUMBER,
      (result, unit) => this.formatByUnit(result, unit),
    ],
    [
      ChallengeActivityGoal.LOWEST_NUMBER,
      (result, unit) => this.formatByUnit(result, unit),
    ],
    [
      ChallengeActivityGoal.SPECIFIC_TARGET,
      (result, unit) => this.formatByUnit(result, unit),
    ],
    [
      ChallengeActivityGoal.SHORTEST_TIME,
      (result) => intToTimestamp(result).toString(),
    ],
    [
      ChallengeActivityGoal.LONGEST_TIME,
      (result) => intToTimestamp(result).toString(),
    ],
    [
      ChallengeActivityGoal.SHORTEST_DISTANCE,
      (result, unit) => this.formatByUnit(result, unit),
    ],
    [
      ChallengeActivityGoal.LONGEST_DISTANCE,
      (result, unit) => this.formatByUnit(result, unit),
    ],
    [
      ChallengeActivityGoal.MOST_IMPROVED,
      (result, unit) => this.formatByUnit(result, unit),
    ],
  ]);

  public formatByUnit(result: number, unit: ChallengeActivityUnits): string {
    const formatter = this.unitFormatters.get(unit);
    return formatter ? formatter(result) : result.toString();
  }

  public formatActivityResult = ({
    result,
    goal,
    unit,
  }: {
    result: number;
    goal: ChallengeActivityGoal;
    unit: ChallengeActivityUnits;
  }): string => {
    const formatter = this.goalFormatStrategies.get(goal);
    return formatter ? formatter(result, unit) : result.toString();
  };
}
