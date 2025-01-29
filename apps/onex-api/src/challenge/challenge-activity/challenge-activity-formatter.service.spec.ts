import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import * as utils from "@o/utils";

import { ChallengeModule } from "@/challenge/challenge.module";
import { DbModule } from "@/db/db.module";
import { ChallengeActivityGoal, ChallengeActivityUnits } from "@/types/graphql";
import { envFile } from "@/utils";

import { ChallengeActivityFormatterService } from "./challenge-activity-formatter.service";

jest.mock("@o/utils", () => ({
  intToTimestamp: jest.fn(),
}));

describe("ChallengeActivityFormatterService", () => {
  let service: ChallengeActivityFormatterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DbModule.forRoot(() => ({
          schema: {},
        })),
        ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile() }),
        ChallengeModule,
      ],
    }).compile();

    service = module.get<ChallengeActivityFormatterService>(
      ChallengeActivityFormatterService
    );

    jest.clearAllMocks();
  });

  describe("formatByUnit", () => {
    it("should format kilograms correctly", () => {
      expect(service.formatByUnit(75, ChallengeActivityUnits.KILOGRAMS)).toBe(
        "75 kg"
      );
      expect(service.formatByUnit(0, ChallengeActivityUnits.KILOGRAMS)).toBe(
        "0 kg"
      );
    });

    it("should format pounds correctly", () => {
      expect(service.formatByUnit(165, ChallengeActivityUnits.POUNDS)).toBe(
        "165 lb"
      );
      expect(service.formatByUnit(0, ChallengeActivityUnits.POUNDS)).toBe(
        "0 lb"
      );
    });

    it("should format distance measurements correctly", () => {
      expect(service.formatByUnit(100, ChallengeActivityUnits.METRES)).toBe(
        "100 m"
      );
      expect(service.formatByUnit(5, ChallengeActivityUnits.KILOMETRES)).toBe(
        "5 km"
      );
      expect(service.formatByUnit(3.1, ChallengeActivityUnits.MILES)).toBe(
        "3.1 mi"
      );
      expect(service.formatByUnit(12, ChallengeActivityUnits.FEET)).toBe(
        "12 ft"
      );
    });

    it("should format percentage correctly", () => {
      expect(service.formatByUnit(75, ChallengeActivityUnits.PERCENT)).toBe(
        "75%"
      );
      expect(service.formatByUnit(0, ChallengeActivityUnits.PERCENT)).toBe(
        "0%"
      );
      expect(service.formatByUnit(100, ChallengeActivityUnits.PERCENT)).toBe(
        "100%"
      );
    });

    it("should format time units using intToTimestamp", () => {
      const mockTimestamp = "formatted time";
      (utils.intToTimestamp as jest.Mock).mockReturnValue({
        toString: () => mockTimestamp,
      });

      expect(service.formatByUnit(60, ChallengeActivityUnits.SECONDS)).toBe(
        mockTimestamp
      );
      expect(service.formatByUnit(5, ChallengeActivityUnits.MINUTES)).toBe(
        mockTimestamp
      );
      expect(service.formatByUnit(2, ChallengeActivityUnits.HOURS)).toBe(
        mockTimestamp
      );
    });
  });

  describe("formatActivityResult", () => {
    it("should format highest number goals correctly", () => {
      const result = service.formatActivityResult({
        result: 100,
        goal: ChallengeActivityGoal.HIGHEST_NUMBER,
        unit: ChallengeActivityUnits.KILOGRAMS,
      });
      expect(result).toBe("100 kg");
    });

    it("should format lowest number goals correctly", () => {
      const result = service.formatActivityResult({
        result: 50,
        goal: ChallengeActivityGoal.LOWEST_NUMBER,
        unit: ChallengeActivityUnits.POUNDS,
      });
      expect(result).toBe("50 lb");
    });

    it("should format specific target goals correctly", () => {
      const result = service.formatActivityResult({
        result: 5,
        goal: ChallengeActivityGoal.SPECIFIC_TARGET,
        unit: ChallengeActivityUnits.KILOMETRES,
      });
      expect(result).toBe("5 km");
    });

    it("should format time-based goals correctly", () => {
      const mockTimestamp = "formatted time";
      (utils.intToTimestamp as jest.Mock).mockReturnValue({
        toString: () => mockTimestamp,
      });

      expect(
        service.formatActivityResult({
          result: 120,
          goal: ChallengeActivityGoal.SHORTEST_TIME,
          unit: ChallengeActivityUnits.SECONDS,
        })
      ).toBe(mockTimestamp);

      expect(
        service.formatActivityResult({
          result: 180,
          goal: ChallengeActivityGoal.LONGEST_TIME,
          unit: ChallengeActivityUnits.SECONDS,
        })
      ).toBe(mockTimestamp);
    });

    it("should format distance-based goals correctly", () => {
      expect(
        service.formatActivityResult({
          result: 10,
          goal: ChallengeActivityGoal.SHORTEST_DISTANCE,
          unit: ChallengeActivityUnits.KILOMETRES,
        })
      ).toBe("10 km");

      expect(
        service.formatActivityResult({
          result: 26.2,
          goal: ChallengeActivityGoal.LONGEST_DISTANCE,
          unit: ChallengeActivityUnits.MILES,
        })
      ).toBe("26.2 mi");
    });

    it("should format most improved goals correctly", () => {
      const result = service.formatActivityResult({
        result: 25,
        goal: ChallengeActivityGoal.MOST_IMPROVED,
        unit: ChallengeActivityUnits.PERCENT,
      });
      expect(result).toBe("25%");
    });

    it("should handle unknown goals by returning raw number as string", () => {
      const result = service.formatActivityResult({
        result: 100,
        goal: "UNKNOWN_GOAL" as ChallengeActivityGoal,
        unit: ChallengeActivityUnits.KILOGRAMS,
      });
      expect(result).toBe("100");
    });

    it("should handle edge cases with zero values", () => {
      (utils.intToTimestamp as jest.Mock).mockReturnValue({
        toString: () => "00:00:00",
      });

      expect(
        service.formatActivityResult({
          result: 0,
          goal: ChallengeActivityGoal.HIGHEST_NUMBER,
          unit: ChallengeActivityUnits.KILOGRAMS,
        })
      ).toBe("0 kg");

      expect(
        service.formatActivityResult({
          result: 0,
          goal: ChallengeActivityGoal.SHORTEST_TIME,
          unit: ChallengeActivityUnits.SECONDS,
        })
      ).toBe("00:00:00");
    });

    it("should handle negative values appropriately", () => {
      expect(
        service.formatActivityResult({
          result: -10,
          goal: ChallengeActivityGoal.MOST_IMPROVED,
          unit: ChallengeActivityUnits.PERCENT,
        })
      ).toBe("-10%");
    });
  });
});
